# Validação de Boleto - API

Queremos poder através da aplicação consultar linhas digitáveis de boleto de título bancário e pagamento de concessionárias, verificando se a mesma é válida ou não. Sendo válida e possuindo valor e/ou data de vencimento ter o retorno desses dados.

## Conteúdo

(1) [Executando a aplicação com Docker](#executando-a-aplicação-com-docker)
(2) [Executando a aplicação em modo de desenvolvimento](#executando-a-aplicação-em-modo-de-desenvolvimento)
(3) [Testando a aplicação](#testando-a-aplicação)

## Executando a aplicação com Docker

```
docker-compose up -d --build boleto

docker-compose up
```

**A aplicação estará disponível na porta `3000`**

```
http://localhost:3000/boleto/:boleto
```

## Executando a aplicação em modo de desenvolvimento

```
# instalar dependências
yarn install

# executar a aplicação
yarn start:dev
```

**A aplicação estará disponível na porta `3000`**

```
http://localhost:3000/boleto/:boleto
```

## Testando a aplicação

```
yarn test
```
