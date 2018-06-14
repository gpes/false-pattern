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
                res.redirect('/questionario/finalizar');
            } catch(e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        },

        retrieve: async (req, res) => {
            try {
                let padrao = req.body.padrao;
                let experiencia = req.body.experiencia;
                
                let find;
                if(experiencia === 'none') find = {}
                else find = { experiencia: experiencia }
                
                let usuariosComRespostas = await respostaRepository.retrieveUsersWithAnwsers(find);

                if(padrao === 'none') res.render('admin/dashboard', { respostas: usuariosComRespostas }); 

                // Array que conterá os dados corretos a serem retornados
                let returnData = [];
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
                        id: usuariosComRespostas[i]._id,
                        formacao: usuariosComRespostas[i].formacao,
                        experiencia: usuariosComRespostas[i].experiencia,
                        resposta: newResposta,
                        suguestao: usuariosComRespostas[i].suguestao
                    }

                    returnData.push(newData);
                }
                
                res.render('admin/dashboard', {
                    respostas: returnData 
                });
            } catch(e) {
                console.log(e)
                res.status(500).send('Falha ao processar requisição')
            }
        }
    }

    return controller;
}