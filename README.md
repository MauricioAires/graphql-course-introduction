# GraphQL Introduction

#### Comandos utilizados durante o curso

```bash
npm init -y

```

```bash
npm install apollo-server graphql
```

```bash
# Utilizado para usar export e import fora de um modulo
npm install sucrase -D
```

```bash
npm install nodemon -D
```

### Utilização

Para rodar a aplicação em modo de desenvolvimento, utilize o seguinte comando:

Para iniciar o Apollo Server

```bash
  $ npm run dev
```

Para iniciar o JSON-Server

```bash
  $ npm run server
```

Criar uma migration utilizando KNEX

```bash
  $ npx knex migrate:make create-comments-table
```

Executar a migration

```bash
  $ npx knex migrate:latest
```

Desafazer a migration

```bash
  $ npx knex migrate:rollback
```
