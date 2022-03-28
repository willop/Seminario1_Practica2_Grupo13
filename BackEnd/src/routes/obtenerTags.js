const con = require('../../database/conection')//conexion bd

async function obtenerTags(username) {
    try {
        const pool = await con;
        const result = await pool.request()
            .query(`select us.tags as cantidad 
            from seminario1.usuario us
            where us.name = '${username}'`);

        let recordset = result.recordset[0].cantidad;
        return recordset;
    } catch (err) {
        console.log('ERROR' + err);
        return "";
    }
}

module.exports = obtenerTags