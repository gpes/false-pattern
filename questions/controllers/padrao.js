module.exports = app => {
    let padraoRepository = app.repositories.padrao;

    let controller = {
        create: async (req, res) => {
            try {
                let tipo = req.body.tipo;
                let nome = req.body.nome;

                termos = [];

                if(Array.isArray(tipo) && Array.isArray(nome)) {
                    for(let i = 0; i < tipo.length; i++) {
                        if(tipo[i].length <= 0 || nome[i].length <= 0) {
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
            } catch(e) {
                console.log(e)
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        },

        getRandomAll: async (req, res) => {
            try {
                let data = await padraoRepository.getAll();
                res.status(200).send(data);        
            } catch(e) {
                res.status(500).send({
                    message: 'Falha ao processar a requisição'
                })
            }
        }
    }

    return controller;
}