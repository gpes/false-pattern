#!/bin/bash
# recebendo o nome do projeto por parametro, podemos usar um arquivo com todos os links e processa-lo
echo $1
wget http://users.encs.concordia.ca/~nikolaos/files/pattern_detection/pattern4.jar
wget http://java.labsoft.dcc.ufmg.br/qualitas.class/corpus/$1.zip
unzip -q $1.zip
java -Xms64m -Xmx2048m -jar pattern4.jar -target $1/bin -output output/$1.xml