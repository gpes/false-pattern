module.exports = app => {
    const conn = app.lib.db;

    return {
        
        findAll: async () => {
            return await conn.query('select * from indicio i where (select count(*) from resposta r where r.id_indicio = i.id) = 0 order by random() limit 15');
        }

    }
}