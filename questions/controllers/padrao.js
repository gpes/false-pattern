module.exports = app => {
    let padraoRepository = app.repositories.padrao;

    const CATEGORIAS = {
        CRIACIONAL: 'criacional',
        ESTRUTURAL: 'estrutural',
        COMPORTAMENTAL: 'comportamental'
    }

    let controller = {
        create: async (req, res) => {
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
                    termos: termos
                }

                await padraoRepository.create(data);
                res.redirect('/cadastrar');
            } catch (e) {
                console.log(e)
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        },

        getRandomAll: async (req, res) => {
            try {
                let data = await padraoRepository.getAll();
                
                let dataForRender = [];

                for(let i = 0; i < 9; i++) {
                    /* 
                        data.length = 16
                        Pegando um padrão aleatorio
                    */                
                    let randomParaPadrao = Math.floor(Math.random() * data.length);
                    let padrao = data[randomParaPadrao];

                    // Pegando os termos de acordo com a categoria do padrão escolhido acima
                    let termosByCategoria = await padraoRepository.getTermosByCategoria(padrao.categoria)                     
                    
                    // Armazenar os termos para a questão
                    let termosParaQuestao = []
                    
                    // Jogando 5 termos no array
                    for(let j = 0; j < 5; j++) {
                        // Pegando termo aleatorio no array de termos
                        let randomParaTermo = Math.floor(Math.random() * termosByCategoria.length);

                        // Pagando o nome de temos aleatorio
                        let randomNome = Math.floor(Math.random() * termosByCategoria[randomParaTermo].termos.length)
                        
                        termosParaQuestao.push(termosByCategoria[randomParaTermo].termos[randomNome].nome);
                    }

                    // Montando obj para questão
                    let questao = {
                        questao: `Questão ${i + 1}`,
                        categoria: padrao.categoria,
                        padrao: padrao.padrao,
                        termos: termosParaQuestao
                    }

                    dataForRender.push(questao);
                }

                res.render('index', {
                    questoes: dataForRender
                });
            } catch (e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        }
    }

    return controller;
}