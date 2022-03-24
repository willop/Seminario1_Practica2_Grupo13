const { Router } = require('express');
const router = Router();

const aws = require('aws-sdk'); //aws

router.post('/ExtraerTexto',(req,res)=>{
    
    var {foto} = req.body;

    const Rekognition = new aws.Rekognition();

    aws.config.update({
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID_REKOGNITION,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_REKOGNITION
    });

    var params = {
      Image: { 
        Bytes: Buffer.from(foto, 'base64')
      }
    };

    Rekognition.detectText(params, function(err, data) {
      if (err) {
        res.json({texto: "Error"})
      }else {
        let cad = ""
        //obteniendo cadena del json 
        data.TextDetections.forEach(element => {
            if(element.Type == "LINE"){
                cad+= element.DetectedText
                cad+= "<br>"
            }
        });  
        res.json({texto: cad});      
      }
    });

});

module.exports = router;