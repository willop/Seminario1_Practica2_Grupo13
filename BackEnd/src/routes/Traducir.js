const { Router } = require('express');
const router = Router();

const aws = require('aws-sdk'); //aws

router.post('/traducir', (req, res) => {
    try {
        text = req.body.text
        language = req.body.idioma

        var translate = new aws.Translate();
        aws.config.update({
            region: process.env.REGION,
            accessKeyId: process.env.ACCESS_KEY_TRASLATE_ID,
            secretAccessKey: process.env.SECRET_ACCESS_TRASLATE_KEY
        });

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