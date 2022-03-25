const { Router } =require('express');
const router = Router();

const aws = require('aws-sdk'); //aws
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd
const aws_keys = require('../../aws/credentials')

router.post('/home', async (req, res) => {
    //destructurando valores
    const { username } = req.body;

    let ruta = ""
    let name = ""
    let resp = 0
    let tag = "no cambio"
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('name', sql.NVarChar)
            .output('path', sql.NVarChar)
            .output('tags', sql.NVarChar)
            .output('response', sql.Int)
            .execute(`PERFIL`);
        ruta= result.output.path
        name= result.output.name
        tag= result.output.tags
        resp= result.output.response
    } catch (error) {
        res.json({"response": resp })
    }

    if (resp) {
        var S3 = new aws.S3(aws_keys.s3);
        
        var getParams =
        {
            Bucket: process.env.BUCKET_S3,
            Key: ruta
        };

        S3.getObject(getParams, function (err, data) {
            if (err) {
                console.log(err)
                res.json({ username: "", name: "", tag : "", foto: "", response: 0 })
            } else {
                result = Buffer.from(data.Body).toString('base64')
                res.json({ username: username, name: name, tag : tag,foto: result, response: resp })
            }
        });
    } else {
        res.json({"response": resp })
    }
});

module.exports = router;