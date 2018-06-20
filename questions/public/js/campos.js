function addCampoSuguestao() {
    let campos = document.getElementsByName('suguestao[nome]');
    let ultimoCampoDeTermos = campos[campos.length - 1];

    let novoCampo = `
        <br>  
        <input type="text" name="suguestao[padrao]" placeholder="Padrão de Projeto">
        <input type="text" name="suguestao[tipo]" placeholder="Tipo">
        <input type="text" name="suguestao[nome]" placeholder="Nome">
    `;

    let span = document.createElement('span');
    span.innerHTML = novoCampo;

    ultimoCampoDeTermos.parentNode.insertBefore(span, ultimoCampoDeTermos.nextSibling);
} 