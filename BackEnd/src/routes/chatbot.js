const { Router } =require('express'); 
const router = Router();
const aws = require('aws-sdk')
const aws_keys = require('../../aws/credentials')
const obtenerAlbums  = require('./obtenerAlbums')
const obtenerFotos  = require('./obtenerFotos')
const obtenerTags  = require('./obtenerTags')

router.post('/chatbot', async (req, res) => {
    
    const {mensaje,username} = req.body;

    const lexruntime = new aws.LexRuntime(aws_keys.lex);

    const params = mapToLex(mensaje,username)

    let data = {}
    let msg = ""
    await lexruntime.postText(params,function(err,data){
        if (err) {
           msg = "Hubo un problema al comunicarse con el bot, pongase en contacto con el administrador."
        }
        else {
            slots = data
            msg = data.message
        } 
    }).promise();

    //obteniendo busqueda de albums
    if (msg.toLowerCase() == "procedimiento-si"){
        msg = "Los albums disponibles para " + username + " son: "
        msg += await obtenerAlbums(username)
    }else if ( msg.toLowerCase() == "procedimiento-fotos-si"){
        msg = "Las fotos disponibles para " + username + " son: "
        msg += await obtenerFotos(username)
    }else if ( msg.toLowerCase() == "procedimiento-tags-si"){
        msg = "Los tags disponibles para " + username + " son: "
        msg += await obtenerTags(username)
    }

    res.json({respuesta : msg})

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
