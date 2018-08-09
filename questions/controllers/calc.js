const fetch = require('node-fetch')

// My own async/aait forEach
async function asyncForEach(array, callback) {
    for(let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

async function handleFetch(url) {
    let res = await fetch(url, {
        headers: {
            'Authorization': 'token ae5712ec955a767553ec11f524f03ea8878c0a52'
        }
    });
    return res.json();
}

/**
 * @description Função para retornar repositorios que são fork de um usuário
 * @param {string} username 
 * @returns {(Array)} Um array contendo os links de todos os repos que são forks 
 * se existirem forks ou um array vazio se não houver forks 
 */
async function returnReposThatAreForks(username) {
    let userRepos = await handleFetch(`https://api.github.com/users/${username}/repos`)
    
    let reposThatAraForks = []
    
    userRepos.forEach(repo => {
        if(repo.fork) reposThatAraForks.push(repo.url)
    });

    if(reposThatAraForks.length > 0) return reposThatAraForks
    else return []
}

/**
 * @description Função para retornar a url o parent de um repositório
 * @param {string} repo 
 * @returns {string} A url do parent do repositório
 */
async function returnParentRepo(repo) {
    let parentRepo = await handleFetch(repo)
    return parentRepo.parent.url;
}

/**
 * @description Função para lidar com as url para requisitar os pulls do repositório
 * @param {string} username
 * @param {string} repo
 * @returns {Array} Um array contendo os endpoint dos commits de cada pull request do usuário
 */
async function handleRepoPulls(username, repo) {
    let pulls = await handleFetch(`${repo}/pulls`)

    let endpointToCommits = []
    
    // O pull request que for do usuário, retorne o link para acessar os commits
    pulls.forEach(pull => {
        if(pull.user.login === username) endpointToCommits.push(pull.commits_url)
    })
    return endpointToCommits
}

/**
 * @description Função para retornar a quantidade de commits de um pull request
 * @param {Array} 
 * @returns {number} Quantidade de commits de um pull request
 */
async function handleACommitEndpoint(commitEndpoint) {
    let commits = await handleFetch(commitEndpoint)
    return commits.length;
}

module.exports = app => {
    let calcRepository = app.repositories.calc
    let usuarioRepository = app.repositories.usuario
    
    let controller = {
        calc: async (req, res) => {
            // const username = 'chabou'
            const username = 'acdlite'
            let quantCommits = 0;
            
            try {
                let forkRepos = await returnReposThatAreForks(username);
                if(forkRepos) {
                    await asyncForEach(forkRepos, async (repo) => {
                        let parentRepo = await returnParentRepo(repo) 
                        console.log("repo: ", parentRepo)                 
                        let commitsEndpoints = await handleRepoPulls(username, parentRepo)
                        console.log("commitsEndpoints:", commitsEndpoints)
                        
                        await asyncForEach(commitsEndpoints, async (commitEndpoint) => {
                            console.log(commitEndpoint)
                            let quant = await handleACommitEndpoint(commitEndpoint);
                            
                            // Faz a soma de todos os commits de todos os pull requests
                            console.log(quant)
                            quantCommits += quant
                            // quantCommits += quant;
                        })
                    })
    
                    // console.log("Quant: ", quantCommits)
                    console.log("final quant", quantCommits)
                } else {
                    console.log('No there is pull requests')
                }
            } catch(e) {
                res.status(500).jsno({error: e})
            }


            res.redirect('/admin/dashboard')
        }
    }   
    
    return controller;
}