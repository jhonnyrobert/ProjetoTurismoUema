# Titullo
#### App para leitura de QRCode onde será possível localizar estabelecimentos através da busca realizada.

### Banco de dados
Banco de dados utilizado é o MySQL e existe o dump para criação do mesmo na raiz do projeto.

Para configurar a aplicação para conectar no banco de dados, a ConnectionFactory deve ser alterada com as configurações do servidor onde o banco de dados for criado.
*Para maiores detalhes consultar o ./dump.sql e ./src/infra/ConnectionFactory.js*

## Back-end

Feito em NodeJS disponibilizando os dados através de uma API REST Full, onde qualquer front-end poderá ser conectado, tanto web, quanto mobile ou integrações com outros sistemas (desde que obedeça as regras da API).

Os seguintes cadastros estão disponíveis
- Usuários
- Estabelecimentos (à fazer)

O controle de usuários já está pronto sendo possível cadastrar, listar e alterar usuários. O controle de login é baseado em JWT (Json Web Token), onde as rotas da aplicação são restritas para usuários logados com exceção da autenticação e cadastro de usuário sem login.

## Instalação e Execução
```$ npm install```
```$ node server```

### Rotas

#### Login

##### POST - Autenticar

- http://localhost:3000/autenticar

Enviar no body da requisição usuário e senha.
```json
{
	"usuario":"admin",
	"senha":"admin"
}
```

##### POST - Cadastrar Usuário sem Login

- http://localhost:3000/noauth/usuario

Utilizado para uma pessoa poder se auto cadastrar no aplicativo sem a necessidade de autenticação prévia para isso. Ao enviar o cadastro, automaticamente terá o perfil usuário comum.

Enviar no body da requisição
```json
{
    "nome": "Usuario 01",
    "usuario": "usuario01",
    "senha": "usuario01",
    "email": "usuario@solutera.com.br",
    "sexo": "m",            /*m - masculino, f-feminino*/
    "nascimento": "19951231",   /*ano mês dia - aaaammdd*/
    "ddd": "98",
    "telefone": "99999999999",
    "cpf": "00000000000"
}
```
**Chave única:** usuario, email, cpf

#### Usuários

##### POST - Cadastrar

- http://localhost:3000/usuarios

Este cadastro só é possível com autenticação. Servirá para o usuário administrador cadastrar novos usuários podendo o mesmo especificar se é um usuário comum ou outro administrador.

Enviar no body da requisição.
```json
{
    "nome": "Professor 01",
    "usuario": "prof01",
    "senha": "prof01",
    "email": "prof@solutera.com.br",
    "sexo": "m",            /*m - masculino, f-feminino*/
    "nascimento": "19951231",   /*ano mês dia - aaaammdd*/
    "ddd": "98",
    "telefone": "99999999999",
    "cpf": "00000000000"
}
```
**Chave única:** usuario, email, cpf

##### GET - Listar

- http://localhost:3000/usuarios

Parâmetros para filtro: *id, usuario, nome, email, cpf, sexo, nascimento, telefone, tipo*

**Obs.:** *Os campos usuario, nome, email e cpf buscam através de 'contém expressão'.*

##### PUT - Alterar

- http://localhost:3000/usuarios

Enviar via body da requisição.
```json
{
    "id": "2",
    "nome": "Professor 01",
    "usuario": "prof01",
    "senha": "prof01",
    "email": "prof@solutera.com.br",
    "foto": "/url_foto/",
    "sexo": "m",            /*m - masculino, f-feminino*/
    "nascimento": "19951231",   /*ano mês dia - aaaammdd*/
    "ddd": "98",
    "telefone": "99999999999",
    "cpf": "00000000000"
}
```

##### GET - Verificar usuário logado

Verifica o usuário que está logado no momento.

- http://localhost:3000/usuarios/logado
