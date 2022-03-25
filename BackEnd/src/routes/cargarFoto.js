const { Router } =require('express'); 
const router = Router();
const { v4: uuidv4 } = require('uuid');//generar id random
const aws_tools = require('../../aws/bucket');
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd
const detectarEtiqueta = require('./detectarEtiquetas')

router.post('/cargarfoto', async (req, res) => {
    
    //variable que valida transaccion
    //insercion en bd
    const { username,nombrefoto,foto,descripcion} = req.body;

    let ruta = "Fotos_Publicadas/" + uuidv4() + ".png"; 
    let r = 0;
    let tags = await detectarEtiqueta(foto)
    
    for (let tag of tags) {
        r = await insertarAlbum(username,tag.Name,nombrefoto,ruta,descripcion)
        if(r==0)break;
    }

    if (r){
        result = aws_tools.insertarImagenBucket(ruta, foto);
    }

    res.json({respuesta : r})
});


async function insertarAlbum(username,album,nombrefoto,ruta,descripcion){
    let r = 0;
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('albumname', album)
            .input('imagename', nombrefoto)
            .input('imagepath', ruta)
            .input('description',descripcion)
            .output('response', sql.Int)
            .execute(`CARGARIMAGEN`);
            r = result.output.response;
    } catch (error) {
        r = 0;
    }
    return r;
}


module.exports = router;