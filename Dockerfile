FROM java:openjdk-8-jre-alpine
COPY run.sh run.sh
RUN apk update
RUN apk add ca-certificates wget
RUN update-ca-certificates 
RUN wget http://users.encs.concordia.ca/~nikolaos/files/pattern_detection/pattern4.jar
# podemos substituir esse download por arquivos locais
RUN wget http://www.softwarevocabulary.org/vocabulary-tool/download/TermsCounter.jar
RUN wget http://www.softwarevocabulary.org/vocabulary-tool/download/VocabularyExtractor.jar
RUN wget http://www.softwarevocabulary.org/vocabulary-tool/download/termsCounter.properties -O termsCounter.properties
#COPY termsCounter_file.properties termsCounter.properties
RUN ["chmod", "+x", "run.sh"]
VOLUME ["/output"]
ENTRYPOINT [ "sh", "run.sh"]