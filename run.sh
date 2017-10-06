#!/bin/bash
# recebendo o nome do projeto por parametro, podemos usar um arquivo com todos os links e processa-lo
echo $1
ls
wget http://java.labsoft.dcc.ufmg.br/qualitas.class/corpus/$1.zip
unzip -q $1.zip
java -Xms64m -Xmx2048m -jar pattern4.jar -target $1/bin -output output/$1.xml
#java -jar VocabularyExtractor.jar -n "axion-1.0-M2" -r "axion-1.0-M2" -d "./src/" -loc iah -vxl "./output/axion-1.0-M2.vxl" -csv "./output/axion-1.0-M2.csv"
#java -jar TermsCounter.jar -prop ./termsCounter.properties -vxl ./output/axion-1.0-M2.vxl -csv ./output/axion-1.0-M2_Matriz.csv -txt ./output/axion-1.0-M2_Info.txt
java -jar VocabularyExtractor.jar -n "$1" -r "$1" -d "$1/src/" -loc iah -vxl "output/$1.vxl" -csv "output/$1.csv"
java -jar TermsCounter.jar -prop termsCounter.properties -vxl ./output/$1.vxl -csv output/$1_Matriz.csv -txt output/$1_Info.txt
