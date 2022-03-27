const { Router } =require('express'); 
const router = Router();
const aws = require('aws-sdk')
const aws_keys = require('../../aws/credentials')

router.post('/chatbot', async (req, res) => {
    
    const {mensaje,username} = req.body;

    const lexruntime = new aws.LexRuntime(aws_keys.lex);

    const params = mapToLex(mensaje,username)

    lexruntime.postText(params,function(err,data){
        if (err) res.json({respuesta : err}) // an error occurred
        else {
            console.log(data) 
            res.json({respuesta : data.message})
        }         // successful response
    });

});

const mapToLex = (mensaje,username) => {
    return {
        botAlias: process.env.BOTALIAS, /* required, has to be '$LATEST' */
        botName: process.env.BOTNAME, /* required, the name of you bot */
        inputText: mensaje, /* required, your text */
        userId: username, /* required, arbitrary identifier */
      };
};

module.exports = router;
