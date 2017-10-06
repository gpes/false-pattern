FROM java:openjdk-8-jre-alpine
COPY run.sh run.sh
#COPY pattern4.jar pattern4.jar
RUN ["chmod", "+x", "run.sh"]
VOLUME ["/output"]
ENTRYPOINT [ "sh", "run.sh"]