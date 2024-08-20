-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'shibaura-ichiba';
CREATE USER 'root'@'db' IDENTIFIED WITH mysql_native_password BY 'shibaura-ichiba';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'db' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS mydatabase;