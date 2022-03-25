const { Router } = require('express');
const router = Router();

const aws = require('aws-sdk'); //aws
const aws_keys = require('../../aws/credentials')

router.post('/ExtraerTexto', (req,res)=>{
    
    var {img} = req.body;

    const Rekognition = new aws.Rekognition(aws_keys.rekognition);
    
    var params = {
      Image: { 
        Bytes: Buffer.from(img, 'base64')
      }
    };

    Rekognition.detectText(params, function(err, data) {
      if (err) {
        console.log(err)
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