const aws = require('aws-sdk'); //aws
const aws_keys = require('../aws/credentials');

require ('dotenv').config();

function insertarImagenBucket(ruta,foto){
    //se convierte la base64 a bytes
    const buff = new Buffer.from(foto, 'base64');
    
    //conexion bucket
    var s3 = new aws.S3(aws_keys.s3);

    const params = {
        Bucket: process.env.BUCKET_S3,
        Key: ruta,
        Body: buff,
        ContentType: "image"
    };

    const putResult = s3.putObject(params).promise();
    console.log("resultado bucket: ",putResult)
}

module.exports.insertarImagenBucket = insertarImagenBucket;