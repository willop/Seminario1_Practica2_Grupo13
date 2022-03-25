const { Router, response } = require('express');
const router = Router();
const aws_keys = require('../../aws/credentials')

const aws = require('aws-sdk'); //aws
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

const comparation = new aws.Rekognition(aws_keys.rekognition);
const S3 = new aws.S3(aws_keys.s3);

router.post('/EntrarCamara', async (req, res) => {


    // parametros
    var username = req.body.username;
    var password = req.body.password;
    var imageComparation = "";
    var ruta = ""
    var resp = 0

    // ejecucion de procedimiento
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('path', sql.NVarChar)
            .output('response', sql.Int)
            .execute('LOGINCAMARA');
            ruta= result.output.path
            resp= result.output.response
    } catch (error) {
        res.json({response: ""})
    }

    // console.log(resp);
    console.log(ruta)
    if (resp) {
        // obtencion de la imagen    
        var photoParams =
        {
            Bucket: process.env.BUCKET_S3,
            Key: ruta
        };
        await S3.getObject(photoParams, function (err, data) {
            if (err) {
                console.log("Error no pude econtrar la foto")
            } else {
                imageComparation = (data.Body).toString('base64')
            }
        }).promise();


        // comparacion de imagenes de perfil
        var params = {
            SourceImage: {
                Bytes: Buffer.from(password, 'base64')
            },
            TargetImage: {
                Bytes: Buffer.from(imageComparation, 'base64')
            },
            SimilarityThreshold: '85'
        };

        // console.log(params);
        
        comparation.compareFaces(params, function (err, data) {
            if (err) {res.json({response:""})}
            else {
                res.json({ response: username });
            }
        });
    }


});


module.exports = router;