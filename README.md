https://explorer-foodexplorer.netlify.app/

Neste projeto foi desenvolvida uma homepage para pedidos de alimentos.
Ele segue uma arquitetura REST - sendo separado em frontend e backend sendo os dados do administrador e dos clientes armazenados em um banco dados, assim como as informações dos pratos, seleção de pratos favoritos, marcadores com os ingredientes dos pratos e informações dos pedidos. O app utiliza os métodos HTTP, como GET, POST, PUT, PATCH e DELETE. Transfere os dados entre cliente e servidor em um formato JSON e além de
manter o estado da aplicação no cliente, em vez de armazená-lo no servidor.

O banco de dados usado é um banco relacional: SQLite e foi utilizado um query-builder: knex.
Ele foi estruturado com a divisão em pastas: src, tmp and utils.

Dentro do src encontra-se as principais funcionalidades do app: a pasta configs que contém arquivos com configurações de autenticação e para upload das imagens dos pratos. Também encontram-se os controllers, banco de dados, middlewares (utilizados para verificação e autenticação do tipo de usuário), diskstorage (manipula o armazenamento e remoção das fotos dos pratos) e routes. A pasta tmp armazena as fotos dos pratos temporariamente até que ao serem salvas são enviadas para a pasta upload que se encontra também dentro da pasta tmp.
Na pasta utils existe um arquivo AppError utilizado para tratamento de erros personalizado.

O banco de dados é dividido nas tabelas: users, userFavorite, userCart, tags and dishes.

#A tabela users apresenta a coluna de roles(enum de admin ou customer), além de id, name, email e password criptografado.

#A tabela userFavorite apresenta os campos id, title, dishes_id(conectado com id da tabela dishes), user_id (conectado com id da tabela users).

#A tabela tags apresenta os campos id, dishes_id(conectado com id da tabela dishes) e name.

#A tabela dishes apresenta as colunas id, avatar(nome da foto com os primeiros caracteres randomicamente criptografados para evitar uma sobreposição de imagens caso o arquivo tenha o mesmo nome), title, category(enum de meal, dessert e drink) e description.

#A tabela userCart apresenta os campos de id, dishes_id(conectado com id da tabela dishes), user_id (conectado com id da tabela users), title, amount, price, subTotal(para cada item adicionado multiplica-se o valor pela quantidade), status(enum de pending, preparing for delivery, out for delivery, delivered ), created_at e updated_at.

Para que haja uma maior segurança foi criado um arquivo .env que dispõe de algumas informações que só podem ser acessadas por os desenvolvedores. Um arquivo .envExample foi criado também para que se saibam quais campos foram omitidos por terem dados sensíveis.
Está sendo utilizado também no Backend o PM2 que é um gerenciador de processos que permite que o backend seja reiniciado automaticamente caso haja qualquer problema.
