# COMANDOS:


### Clone o projeto:
Aqui temos 2 comandos 1 para quem usa chave SSh e outro para quem nao utiliza, entao use o protocolo HTTP
```sh
git clone git@github.com:bolicos/proffy-server.git
                        or
git clone https://github.com/bolicos/proffy-server.git
```

### Entrar na pasta do projeto:
```sh
cd proffy-server
```

### **Os comandos a seguir devem estar dentro da pasta do projeto:**

### Primeira coisa a se fazer é instalar as dependecias:
```sh
yarn install or npm i
```

### Antes de rodar o projeto é necessario ser rodado as migracoes:
```sh
yarn knex:migrate or npm knex:migrate
```

### Apos rodar as migracoes execute este comando para iniciar o backend:
```sh
yarn start or npm start
```


# FUNCIONALIDADES

## CONEXÕES

- Rota para listar o total de conexões realizadas;
- Rota para criar uma nova conexão;

## AULAS

- Rota para criar uma aula;
- Rota para listar aulas;
    - Filtrar por matéria, dia da semana e horário;
