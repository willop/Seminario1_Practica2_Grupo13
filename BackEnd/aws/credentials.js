require ('dotenv').config();
let aws_keys = {
    s3: {
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    rekognition : {
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID_REKOGNITION,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_REKOGNITION
    },
    translate: {
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_TRASLATE_ID,
        secretAccessKey: process.env.SECRET_ACCESS_TRASLATE_KEY 
    }
};

module.exports = aws_keys