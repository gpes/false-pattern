FROM java:openjdk-8-jre-alpine
COPY run.sh run.sh
RUN ["chmod", "+x", "run.sh"]
VOLUME ["/output"]
ENTRYPOINT [ "sh", "run.sh"]