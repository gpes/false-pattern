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

// FUNÇÕES COM FOCO EM REPOSITÓRIOS DO USER E SEUS COMMITS

async function countCommitsOfARepo(repoUrl) {
    let commits = await handleFetch(`${repoUrl}/commits`)
    
    if(!isNaN(commits.length)) return commits.length
    return 0
}

// FUNCÕES COM FOCO EM FORKS E PULL REQUESTS

/**
 * @description Função para retornar repositorios que são ou não fork de um usuário
 * @param {string} username
 * @param {boolean} sholdBeForks 
 * @returns {Array} Um array contendo os links de todos os repos que são ou não forks
 * ou um array vazio se não houver nenhum repositório 
 */
async function returnRepos(username, shouldBeForks) {
    let userRepos = await handleFetch(`https://api.github.com/users/${username}/repos`)
    
    let repos = []

    userRepos.forEach(repo => {
        if(shouldBeForks) {
            if(repo.fork) {
                repos.push(repo.url)
            } 
        } else {
            if(!repo.fork) {
                repos.push(repo.url)
            }
        }
    });

    if(repos.length > 0) return repos
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

/**
 * @description Função para calcular a experiencia do desenvolvedor
 * @param {number} numberOfCommits 
 * @param {number} numberOfCommitsPR 
 * @returns {number} Calculo da experiencia
 */
function calcExp(numberOfCommits, numberOfCommitsPR) {
    return numberOfCommits + (2 * numberOfCommitsPR)
}

module.exports = app => {
    let calcRepository = app.repositories.calc
    let usuarioRepository = app.repositories.usuario
    
    let controller = {
        calc: async (req, res) => {
            // const username = 'chabou'
            // const username = 'acdlite'
            const username = 'natansevero'
            let quantCommits = 0;
            
            try {
                // let forkRepos = await returnRepos(username, true);
                // if(forkRepos) {
                //     await asyncForEach(forkRepos, async (repo) => {
                //         let parentRepo = await returnParentRepo(repo) 
                //         console.log("repo: ", parentRepo)                 
                //         let commitsEndpoints = await handleRepoPulls(username, parentRepo)
                //         console.log("commitsEndpoints:", commitsEndpoints)
                        
                //         await asyncForEach(commitsEndpoints, async (commitEndpoint) => {
                //             console.log(commitEndpoint)
                //             let quant = await handleACommitEndpoint(commitEndpoint);
                            
                //             // Faz a soma de todos os commits de todos os pull requests
                //             console.log(quant)
                //             quantCommits += quant
                //             // quantCommits += quant;
                //         })
                //     })
    
                //     // console.log("Quant: ", quantCommits)
                //     console.log("final quant", quantCommits)
                // } else {
                //     console.log('No there is pull requests')
                // }
                let finalCount = 0;
                let repos = await returnRepos(username, false);
                if(repos) {
                    await asyncForEach(repos, async (repo) => {
                        console.log(repo)
                        let count = await countCommitsOfARepo(repo)
                        console.log(count)
                        finalCount += count
                    })
                }

                console.log("finalCount", finalCount)
            } catch(e) {
                res.status(500).json({error: e.message})
            }


            res.redirect('/admin/dashboard')
        }
    }   
    
    return controller;
}