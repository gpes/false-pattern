module.exports = app => {
    const respostasRespository = app.repositories.respostas;

    return {
        answer: async (idIndicio, resposta) => {
            let booleanResposta = resposta === 'SIM' ? true : false;
            return await respostasRespository.insert(idIndicio, booleanResposta);
        } 
    }
}