const { Router } = require('express');
const router = Router();

const aws = require('aws-sdk'); //aws
const aws_keys = require('../../aws/credentials')

const { v4: uuidv4 } = require('uuid');//generar id random
const sql = require('mssql')//sql server node
const con = require('../../database/conection');//conexion bd

router.post('/DetalleFoto',async (req,res)=>{
    const {username,idfoto} = req.body
    let foto = ""
    let descripcion = ""
    let resp = 0
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('idfoto', idfoto)
            .output('path', sql.NVarChar)
            .output('description', sql.NVarChar)
            .output('response', sql.Int)
            .execute(`DETALLEFOTO`);
        
        foto= result.output.path
        descripcion= result.output.description
        resp= result.output.response

    } catch (error) {
        res.json({ "response": resp })
    }

    if (resp){
        var S3 = new aws.S3(aws_keys.s3);

        var getParams =
        {
            Bucket: process.env.BUCKET_S3,
            Key: foto
        };

        S3.getObject(getParams, function (err, data) {
            if (err) {
                console.log("detalleFoto ", err)
                res.json({foto : "",descripcion: ""})
            } else {
                result = Buffer.from(data.Body).toString('base64')
                res.json({foto : result,descripcion: descripcion})
            }
        });
    }else{
        res.json({foto : "",descripcion: ""})
    }
    // let ruta = "Fotos/" + uuidv4() + ".png";
    // console.log(ruta)
    // res.json({foto : foto,descripcion: descripcion})
});

module.exports = router;