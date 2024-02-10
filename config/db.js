const sql = require('mssql')
require('dotenv').config()

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

module.exports = {
    connect: async () => {
        try {
            await sql.connect(config);
            console.log('Conexión exitosa a la base de datos');
        } catch (err) {
            console.error('Error al conectar a la base de datos:', err);
            throw err;
        }
    },

    disconnect: () => {
        sql.close();
        console.log('Conexión cerrada');
    },

    query: async (queryString) => {
        try {
            const result = await sql.query(queryString);
            return result.recordset;
        } catch (err) {
            console.error('Error en la consulta:', err);
            throw err;
        }
    },
}