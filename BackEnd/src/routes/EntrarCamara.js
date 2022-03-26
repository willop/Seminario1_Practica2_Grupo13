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
    console.log(" ")
    if (resp) {
        // obtencion de la imagen    
        var photoParams =
        {
            Bucket: process.env.BUCKET_S3,
            Key: ruta
        };

        let a = await S3.getObject(photoParams, function (err, data) {
            if (err) {
                // console.log("Error no pude econtrar la foto")
                return null
            } else {
                imageComparation = Buffer.from(data.Body, 'base64')
                return imageComparation
            }
        }).promise();

        console.log("antes de entrar a los parametros")
        // console.log(a);
        // comparacion de imagenes de perfil
        var params = {
            SimilarityThreshold: 50,
            SourceImage: {
                Bytes: Buffer.from(password, 'base64')
            },
            TargetImage: {
                Bytes: imageComparation
            }            
        };

        console.log(" ")
        // console.log(a)

        comparation.compareFaces(params,  function (err, data) {
            if (err) {
                console.log("datos -->",err);
                res.json({response: ""})
            }
            else {
                res.json({ response: username});
            }
        });
    }


});


module.exports = router;