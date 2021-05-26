# Instalando a Aplicação via npm

Execute o comando `npm i ` no diretório da aplicação.

Para executar a aplicação em desenvolvimento basta executar o comando `npm run start `

# Instalando a Aplicação Docker

Execute o comando `docker compose up ` no diretório da aplicação.

Ao inicializar o container todas as dependências serão instaladas e a aplicação será iniciada.

# Documentação da API

Com a aplicação em execução, acessar o endereço http://127.0.0.1:7676/docs, o endereço contém a documentação de todos os end-points existentes na aplicação.

# Testes

1 - Com o PostMan, importar o arquivo `./examples/Oystr.postman_collection.json`.

2 - No postman, usar a URI "Auth" passando como parâmetro um nome de dispositivo(fictício) para gerar o token de autorização da API

3 - Adicionar o token no cabeçalho de todas as URIs utilizadas.
ex: ` headers: { 'Authorization': 'Bearer SEU_TOKEN' }`

# WebHook

As mensagem são enviadas para o endereço https://webhook.site/bcdc39f6-60f5-4b44-80a2-8e46a36fdefc

Customização do WebHook editar o arquivo cfg.json, na raiz da aplicação e informar o endereço desejado.

`{ "webhook": "your customized url" } `

# Banco de dados

Para simplificar a demonstração desse teste, o banco de dados escolhido foi o SQLLite, a base de dados é criado automáticamente ao iniciar a aplicação, porém o script de criação pode ser acessado no diretório `./data_base/oystr_sqlite_create`.

Todas as notificações geradas são salvas no banco de dados, somente com a finalidade de demonstrar o conhecimento na área.
