#!/bin/bash
# recebendo o nome do projeto por parametro, podemos usar um arquivo com todos os links e processa-lo
# sh ./run2.sh (nome_projeto) (y -> para baixar / n -> para não baixar)
echo $1
echo $2

# ls

if [ $2 != "y" ]
then
	echo "nao baixar"
else
	cd ./projects
        wget http://java.labsoft.dcc.ufmg.br/qualitas.class/corpus/$1.zip
        unzip -q $1.zip
        cd ..
        mkdir output/$1
fi

java -Xms64m -Xmx2048m -jar pattern4.jar -target projects/$1/bin -output output/$1/$1.xml
java -jar VocabularyExtractor.jar -n "$1" -r "$1" -d "./projects/$1/src/" -loc iah -vxl "./output/$1/$1.vxl" -csv "./output/$1/$1.csv"
java -jar TermsCounter.jar -prop ./termsCounter.properties -vxl ./output/$1/$1.vxl -csv ./output/$1/$1_Matriz.csv -txt ./output/$1/$1_Info.txt

