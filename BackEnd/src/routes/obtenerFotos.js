const con = require('../../database/conection')//conexion bd

async function obtenerFotos(username) {
    try {
        const pool = await con;
        const result = await pool.request()
            .query(`select count(*) as cantidad from seminario1.usuario us
            inner join seminario1.album al on us.idUser = al.idUser
            inner join seminario1.imagen im on al.idAlbum = im.idAlbum
            where us.name = '${username}'`);

        let recordset = result.recordset[0].cantidad;
        return recordset;
    } catch (err) {
        console.log('ERROR' + err);
        return -1;
    }
}

module.exports = obtenerAlbums