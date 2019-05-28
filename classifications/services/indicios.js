module.exports = app => {
    const indiciosRepository = app.repositories.indicios;
    
    return {
        findAll: async () => {
            return await indiciosRepository.findAll();
        }
    }
} 