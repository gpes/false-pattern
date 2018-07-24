// modal init
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});

// select init 
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
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
    // let campos = document.getElementsByName('suguestao[nome]');
    let campos = document.getElementsByClassName('sug');
    let ultimoCampoDeTermos = campos[campos.length - 1];

    let novoCampo = `
        <br>  
        <select name="suguestao[padrao]" class="input-color-text">
            <option value="none" disabled selected>Selecione um padrão</option>
            <optgroup label="Criacional">
                <option value="builder">Builder</option>
                <option value="factory method">Factory Method</option>
                <option value="prototype">Prototype</option>
                <option value="singleton">Singleton</option>            
            </optgroup>
                    
            <optgroup label="Estrutural">
                <option value="adapter">Adapter</option>
                <option value="bridge">Bridge</option>
                <option value="composite">Composite</option>
                <option value="decorator">Decorator</option>
                <option value="proxy">Proxy</option> 
                <option value="chain">Chain of Responsibility</option>
            </optgroup>

            <optgroup label="Comportamental">
                <option value="command">Command</option>
                <option value="observer">Observer</option>
                <option value="state">State</option>
                <option value="strategy">Strategy</option>
                <option value="template method">Template Method</option>
                <option value="visitor">Visitor</option>
            </optgroup>
        </select>

        <select name="suguestao[tipo]">
            <option value="none" disabled selected>Selecione um tipo de termo</option>
            <option value="classe">Classe</option>
            <option value="atributo">Atributo</option>
            <option value="metodo">Método</option>
        </select>

        <input type="text" class="input-color-text" name="suguestao[nome]" placeholder="Digite o termo">
    `;

    let div = document.createElement('div');
    div.classList.add('sug');
    div.innerHTML = novoCampo;

    ultimoCampoDeTermos.parentNode.insertBefore(div, ultimoCampoDeTermos.nextSibling);

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
} 
