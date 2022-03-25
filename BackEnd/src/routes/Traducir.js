const { Router } = require('express');
const router = Router();
const aws_keys = require('../../aws/credentials')

const aws = require('aws-sdk'); //aws

router.post('/traducir', (req, res) => {
    try {
        text = req.body.texto
        language = req.body.idioma

        var translate = new aws.Translate(aws_keys.translate);

        let params = {
            SourceLanguageCode: 'auto',
            TargetLanguageCode: language,
            Text: text || 'Default'
        };
        translate.translateText(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                res.send({
                    traduccion: "No lo pude Traduccir XD"
                });
            } else {
                //   console.log(data.TranslatedText);
                res.send({
                    traduccion: data.TranslatedText
                });
            }
        });
    } catch (error) {
        res.json({
            traduccion: "No lo pude Traduccir XD"
        });
    }

});

module.exports = router;