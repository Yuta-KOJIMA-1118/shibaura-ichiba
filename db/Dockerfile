FROM mysql:8.3.0

COPY init.sql /docker-entrypoint-initdb.d/
COPY my.cnf /etc/mysql/my.cnf

EXPOSE 3306