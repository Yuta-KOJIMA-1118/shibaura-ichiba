alias git-log='git log --oneline --decorate --graph --branches --tags --remotes'
alias lcl='docker-compose up'

init() {
  cat <<EOL > .env
MYSQL_ROOT_PASSWORD=shibaura-ichiba
MYSQL_DATABASE=mydatabase
MYSQL_USER=shibaura
MYSQL_PASSWORD=shibaura-pass

# DB
DB_HOST=db
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=shibaura-ichiba
DB_DATABASE=mydatabase
EOL

  cat <<EOL > ./server/config/.env
DOCKER_DB_HOST=db
EOL

  docker-compose build
}