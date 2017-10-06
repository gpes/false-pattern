# Projeto **_false_-pattern**

Este projeto tem por objetivo automatizar, usando a ferramenta [Docker](https://www.docker.com/), a execução de um experimento que:
* Realiza o download de um projeto do [Qualitas.class Corpus](http://java.labsoft.dcc.ufmg.br/qualitas.class/index.html);
* Executa a ferramenta [Design Pattern detection Tool](http://users.encs.concordia.ca/~nikolaos/pattern_detection.html) para detectar padrões de projeto de software;

# How to

Para executar este experimento devemos realizar o seguinte conjunto de passos:
* `git clone https://github.com/gpes/false-pattern.git`
* Na pasta criada (`false-pattern`), `docker build -t job/design-pattern . `
* Na pasta criada (`false-pattern)`, `docker run  -v $(pwd)/output:/output job/design-pattern axion-1.0-M2`, onde `axion-1.0-M2` é o nome do projeto que desejamos analisar.
