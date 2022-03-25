const aws = require('aws-sdk'); //aws
const aws_keys = require('../../aws/credentials')

async function detectarEtiqueta(foto){
    const Rekognition = new aws.Rekognition(aws_keys.rekognition);

    var params = {
        Image: { 
          Bytes: Buffer.from(foto, 'base64')
        },
        MaxLabels: 3
      };

    let labels
    await Rekognition.detectLabels(params, function(err, data) {
        if (err) {
            labels =""
        } 
        else { 
            labels = data.Labels
        }
    }).promise();
    return labels
}


module.exports = detectarEtiqueta