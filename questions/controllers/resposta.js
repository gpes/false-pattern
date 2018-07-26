module.exports = app => {

    let respostaRepository = app.repositories.resposta;

    let controller = {
        post: async (req, res) => {
            // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            
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
                            categoria: req.body[key].categoria,
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
                    
                    if(padroes === undefined || tipos === undefined || nomes === undefined) continue;

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
                res.redirect('/questionario/finalizar');
            } catch(e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        },

        retrieve: async (req, res) => {
            try {
                let categoria = req.body.categoria;
                let padrao = req.body.padrao;
                console.log(categoria, padrao)
                let usuariosComRespostas = await respostaRepository.retrieveUsersWithAnwsers();

                let returnData = [];
                if(categoria !== 'none') {
                    for(let i = 0; i < usuariosComRespostas.length; i++) {
                        let resposta = usuariosComRespostas[i].resposta;
    
                        // Array que conterá somente os objs { termos, padrao } que conterem o padrao definido na pesquisa
                        let newResposta = [];
                        for(let j = 0; j < resposta.length; j++) {
                            if(resposta[j].categoria === categoria) newResposta.push(resposta[j])
                        }
    
                        if(newResposta.length == 0) continue;
    
                        // Montando obj para o array de conterá os dados corretos
                        let newData = {
                            id: usuariosComRespostas[i]._id,
                            email: usuariosComRespostas[i].email,
                            public_repos: usuariosComRespostas[i].public_repos,
                            resposta: newResposta,
                            suguestao: usuariosComRespostas[i].suguestao
                        }
    
                        returnData.push(newData);
                    }
                } else if(padrao !== 'none') {

                    for(let i = 0; i < usuariosComRespostas.length; i++) {
                        let resposta = usuariosComRespostas[i].resposta;
    
                        // Array que conterá somente os objs { termos, padrao } que conterem o padrao definido na pesquisa
                        let newResposta = [];
                        for(let j = 0; j < resposta.length; j++) {
                            if(resposta[j].padrao === padrao) newResposta.push(resposta[j])
                        }
    
                        if(newResposta.length == 0) continue;
    
                        // Montando obj para o array de conterá os dados corretos
                        let newData = {
                            _id: usuariosComRespostas[i]._id,
                            email: usuariosComRespostas[i].email,
                            public_repos: usuariosComRespostas[i].public_repos,
                            resposta: newResposta,
                            suguestao: usuariosComRespostas[i].suguestao
                        }
    
                        returnData.push(newData);
                    }
                } else {
                    returnData = usuariosComRespostas;
                }
                
                console.log(returnData)
                // Array que conterá os dados corretos a serem retornados
                res.status(200).send(returnData);
            } catch(e) {
                console.log(e)
                res.status(500).send('Falha ao processar requisição')
            }
        }
    }

    return controller;
}