FROM postgres

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 12345
ENV POSTGRES_DB classification

COPY script.sql /docker-entrypoint-initdb.d/insert.sql