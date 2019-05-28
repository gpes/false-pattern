module.exports = app => {
    const conn = app.lib.db;

    return {
        
        findAll: async () => {
            return await conn.query('SELECT * FROM indicios');
        }

    }
}