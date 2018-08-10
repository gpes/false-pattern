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
            'Authorization': 'token 726fcffc9f5e0929aedcdd46dd0f64bf6c17e783'
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
    if(Array.isArray(pulls)) {
        pulls.forEach(pull => {
            if(pull.user.login === username) endpointToCommits.push(pull.commits_url)
        })
    } else {
        if(pulls.user.login === username) endpointToCommits.push(pulls.commits_url)
    }
    return endpointToCommits
}

/**
 * @description Função para retornar a quantidade de commits de um pull request
 * @param {Array} 
 * @returns {number} Quantidade de commits de um pull request
 */
async function handleACommitEndpoint(commitEndpoint) {
    let commits = await handleFetch(commitEndpoint)

    let time = ''

    if(Array.isArray(commits)) {
        let time1 = commits[0].commit.author.date
        let time2 = commits[commits.length - 1].commit.author.date

        time = calcTimeCommit(time1, time2)
    } else {
        time = 'only one commit'
    }

    return {
        quant: commits.length,
        time: time
    }
}

function calcTimeCommit(time1, time2) {
    let parse1 = Date.parse(time1)
    let parse2 = Date.parse(time2)

    let final = parse2 - parse1
    // console.log(new Date(final).getHours())
    // console.log(new Date(final).getMinutes())
    // console.log(new Date(final).getSeconds())

    return `${new Date(final).getHours()}:${new Date(final).getMinutes()}:${new Date(final).getSeconds()}`
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

async function commitsPullRequest(username) {
    let quantCommits = 0;
    let pulls = []

    let forkRepos = await returnRepos(username, true);
    if(forkRepos) {
        await asyncForEach(forkRepos, async (repo) => {
            console.log("novoRepo:", repo)
            let parentRepo = await returnParentRepo(repo) 
            console.log("repo: ", parentRepo)                 
            let commitsEndpoints = await handleRepoPulls(username, parentRepo)
            console.log("commitsEndpoints:", commitsEndpoints)
            
            if(commitsEndpoints.length == 0) {
                quantCommits += 0
            } else {
                await asyncForEach(commitsEndpoints, async (commitEndpoint) => {
                    console.log(commitEndpoint)
                    let commits = await handleACommitEndpoint(commitEndpoint);
                    
                    pulls.push({ 
                        endpoint: commitEndpoint,
                        quant_commits: commits.quant,
                        tempo: commits.time 
                    })

                    // Faz a soma de todos os commits de todos os pull requests
                    console.log(commits.quant)
                    quantCommits += commits.quant
                    // quantCommits += quant;
                })
            }
        })
    
        // console.log("Quant: ", quantCommits)
        console.log("final quant", quantCommits)
    } else {
        console.log('No there is pull requests')
    }

    return {
        quantCommits: quantCommits,
        pulls: pulls
    }
}

async function commitsUser(username) {
    let countCommitsRepos = 0;
    let repos = await returnRepos(username, false);
    if(repos) {
        await asyncForEach(repos, async (repo) => {
            console.log(repo)
            let count = await countCommitsOfARepo(repo)
            console.log(count)
            countCommitsRepos += count
        })
    }
    
    console.log("countCommitsRepos: ", countCommitsRepos)
    
    return countCommitsRepos;
}


module.exports = app => {
    let calcRepository = app.repositories.calc
    let usuarioRepository = app.repositories.usuario
    
    let controller = {
        calc: async (req, res) => {
            // const username = 'chabou'
            // const username = 'acdlite'
            // const username = 'natansevero'
            
            // const users = usuarioRepository.getAll();
            // const users = ['chabou', 'acdlite', 'natansevero']
            const users = ['chabou']
            // const users = await usuarioRepository.getAll()
            // console.log(users)

            try {
                
                for(let i = 0; i < users.length; i++) {
                    let pulls = []
                    
                    const commits = await commitsUser(users[i])
                    const commitsPull = await commitsPullRequest(users[i])
                    console.log("commitsPull: ", commitsPull)
                    const exp = calcExp(commits, commitsPull.quantCommits)
                    console.log("AAAAAAAAA", users[i], exp)

                    await calcRepository.create({
                        usuario: users[i],
                        exp: exp,
                        pulls: commitsPull.pulls
                    })
                }
            } catch(e) {
                res.status(500).json({error: e.message})
            }

            res.redirect('/admin/dashboard')
        }
    }   
    
    return controller;
}