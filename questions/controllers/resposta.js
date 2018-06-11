module.exports = app => {

    let respostaRepository = app.repositories.resposta;

    let controller = {
        post: async (req, res) => {

            let respostas = [];
            let suguestoes = [];

            for (let key in req.body) {
                if (key !== 'suguestao') {
                    let termos = req.body[key].termos;

                    if(req.body[key].termos === undefined) continue; 

                    if (!Array.isArray(termos)) {
                        let arrTermos = [termos];

                        let obj = {
                            padrao: req.body[key].padrao,
                            termos: arrTermos
                        }

                        respostas.push(obj)
                    } else {
                        respostas.push(req.body[key]);
                    }
                } else {
                    let padroes = req.body[key].padrao;
                    let tipos = req.body[key].tipo;
                    let nomes = req.body[key].nome;

                    if(padroes.length == 0 || tipos.length == 0 || nomes.length == 0) continue; 
                    
                    if (!Array.isArray(padroes) && !Array.isArray(tipos) && !Array.isArray(nomes)) {
                        
                        let obj = {
                            padrao: padroes,
                            tipo: tipos,
                            nome: nomes
                        }

                        suguestoes.push(obj);
                    } else {
                        for (let i = 0; i < padroes.length; i++) {
                            if(padroes[i].length == 0 || tipos[i].length == 0 || nomes[i].length == 0) continue;
                            
                            let obj = {
                                padrao: padroes[i],
                                tipo: tipos[i],
                                nome: nomes[i]
                            }

                            suguestoes.push(obj);
                        }
                    }
                }
            } // end for..in

            let data = {
                resposta: respostas,
                suguestao: suguestoes
            }

            console.log(data);

            try {
                await respostaRepository.create(req.session.id_usuario, data);
                res.redirect('/q/finalizar');
            } catch(e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        }
    }

    return controller;
}