document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});

// Array com as 10 questões
let questoes = document.getElementsByClassName('questao')
let indexQuestion = 0;
questoes[indexQuestion].classList.remove('hide')

function proximo() {
    console.log("pro")
    if(indexQuestion == 9) {
        document.getElementById('form_questoes').submit();
    } else {
        questoes[indexQuestion].classList.add('hide')        
        ++indexQuestion;
        questoes[indexQuestion].classList.remove('hide')
        questoes[indexQuestion].classList.add('fadeInRightBig')
        
    }
}

function anterior() {
    console.log("anterior")
    if(indexQuestion == 0) {
        // does something
    } else {
        questoes[indexQuestion].classList.add('hide')
        --indexQuestion;
        questoes[indexQuestion].classList.remove('fadeInRightBig')        
        questoes[indexQuestion].classList.remove('hide')
        questoes[indexQuestion].classList.add('fadeInLeftBig')        
    }
}

function addCampoSuguestao() {
    let campos = document.getElementsByName('suguestao[nome]');
    let ultimoCampoDeTermos = campos[campos.length - 1];

    let novoCampo = `
        <br>  
        <input type="text" class="input-color-text" name="suguestao[padrao]" placeholder="Padrão de Projeto">
        <input type="text" class="input-color-text" name="suguestao[tipo]" placeholder="Tipo">
        <input type="text" class="input-color-text" name="suguestao[nome]" placeholder="Nome">
    `;

    let span = document.createElement('span');
    span.innerHTML = novoCampo;

    ultimoCampoDeTermos.parentNode.insertBefore(span, ultimoCampoDeTermos.nextSibling);
} 
