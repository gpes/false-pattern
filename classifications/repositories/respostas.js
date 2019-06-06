module.exports = app => {
    const conn = app.lib.db;

    return {
        insert: async (idIndicio, resposta) => {
            let result = await conn.query('insert into resposta(id_indicio, resposta) values ($1, $2)', [idIndicio, resposta]);
            return result.rowCount > 0;
        }
    }
}