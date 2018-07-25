module.exports = app => {
    let padraoRepository = app.repositories.padrao;

    const CATEGORIAS = {
        CRIACIONAL: 'criacional',
        ESTRUTURAL: 'estrutural',
        COMPORTAMENTAL: 'comportamental'
    }

    let controller = {
        post: async (req, res) => {
            try {
                let tipo = req.body.tipo;
                let nome = req.body.nome;

                termos = [];

                if (Array.isArray(tipo) && Array.isArray(nome)) {
                    for (let i = 0; i < tipo.length; i++) {
                        if (tipo[i].length <= 0 || nome[i].length <= 0) {
                            res.status(500).send({
                                message: 'Falha ao processar a requisição'
                            })
                        } else {
                            let obj = {
                                tipo: tipo[i],
                                nome: nome[i]
                            }

                            termos.push(obj);
                        }
                    }
                } else {
                    let obj = {
                        tipo: tipo,
                        nome: nome
                    }

                    termos.push(obj)
                }

                let data = {
                    padrao: req.body.padrao,
                    categoria: req.body.categoria,
                    descricao: req.body.descricao,
                    imagem: req.body.imagem,
                    termos: termos
                }

                await padraoRepository.create(data);
                res.redirect('/admin/padrao/cadastrar-padrao');
            } catch (e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        },

        getRandomAll: async (req, res) => {
            try {
                let data = await padraoRepository.getAll();
                
                let dataForRender = [];
                
                // Arrays que irão conter os numero que já sairam no random para os padrões
                let numerosParaQuestoes = [];

                let i = 0;
                while(i < 9) {
                    /* 
                        data.length = 16
                        Pegando um padrão aleatorio
                    */             
                    let randomParaPadrao = Math.floor(Math.random() * data.length);

                    // Check se o numero já saiu, se não, jogue ele no array
                    if(numerosParaQuestoes.includes(randomParaPadrao)) continue;
                    else numerosParaQuestoes.push(randomParaPadrao);

                    let padrao = data[randomParaPadrao];

                    // Pegando os termos de acordo com a categoria do padrão escolhido acima
                    let termosByCategoria = await padraoRepository.getTermosByCategoria(padrao.categoria)                     
                    
                    // Uma lista de termos daquele padrão sorteado. Um desses termos, servirar para assegurar UMA ALTERNATIVA CORRETA
                    let termosByPadrao = await padraoRepository.getTermosByPadrao(padrao.padrao)

                    // Armazenar os termos para a questão
                    let termosParaQuestao = []
                    
                    // Arrays que irão conter os numero que já sairam no random para os termos
                    let verificarTermosParaAlternativas = [];

                    // Random para um termos do padrão da questão
                    let randomParaUmTermoAssegurado = Math.floor(Math.random() * termosByPadrao[0].termos.length)
                    // Pegando um termo assegurado
                    let nomeAssegurado = termosByPadrao[0].termos[randomParaUmTermoAssegurado].nome
                    
                    // Um termos assegurado para o array de termos da questão
                    verificarTermosParaAlternativas.push(nomeAssegurado)
                    termosParaQuestao.push(nomeAssegurado)

                    // Jogando 4 termos no array
                    let j = 0;
                    while(j < 4) {
                        // Pegando termo aleatorio no array de termos
                        let randomParaTermo = Math.floor(Math.random() * termosByCategoria.length);
                        
                        // Pagando o nome de temos aleatorio
                        let randomNome = Math.floor(Math.random() * termosByCategoria[randomParaTermo].termos.length)

                        let nome = termosByCategoria[randomParaTermo].termos[randomNome].nome

                        if(verificarTermosParaAlternativas.includes(nome)) continue;
                        else verificarTermosParaAlternativas.push(nome);

                        termosParaQuestao.push(nome);
                        
                        j++;
                    } // end while 5

                    termosParaQuestao.sort((a, b) => {
                        return a > b;
                    })

                    // Montando obj para questão
                    let questao = {
                        categoria: padrao.categoria,
                        padrao: padrao.padrao,
                        descricao: padrao.descricao,
                        imagem: padrao.imagem,
                        termos: termosParaQuestao
                    }

                    dataForRender.push(questao);
                    
                    i++;
                } // end while 9 

                
                // Ordenando questões por categoria
                dataForRender.sort((a, b) => {
                    return a.categoria > b.categoria;
                });

                res.render('questionario', {
                    questoes: dataForRender
                });
            } catch (e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }

        },
        
        updatePadrao: async (req, res) => {
            try {
                let data = {
                    padrao: req.body.padrao,
                    descricao: req.body.descricao,
                    imagem: req.body.imagem
                }

                await padraoRepository.updateDescAndImgByPadrao(data)
                
                res.redirect('/admin/padrao/atualizar-padrao')
            } catch(e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }

        }
    }

    return controller;
}