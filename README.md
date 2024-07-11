# Bem-vindo ao Projeto Multi Banco de Dados!

Este projeto foi desenvolvido para demonstrar a integração de múltiplos bancos de dados utilizando o **Strategy Pattern**. Com ele, é possível gerenciar e operar com diferentes fontes de dados de maneira eficiente e organizada. A seguir, apresentamos os principais componentes e tecnologias utilizadas no projeto:

## Tecnologias Utilizadas

- **Strategy Pattern para Múltiplos Bancos de Dados**: Organiza o acesso e a gestão de dados de diferentes fontes.
- **Mongoose**: Modelagem de dados para MongoDB, simplificando a definição de esquemas e interações com o banco de dados.
- **Sequelize**: ORM para Node.js que facilita a comunicação com bancos SQL, incluindo Postgres.
- **MongoDB e Postgres**: Bancos de dados NoSQL e SQL, respectivamente.
- **Docker e docker-compose**: Ferramentas para criar e executar aplicativos em ambientes isolados de contêineres.
- **Fastify**: Framework web rápido e de baixa sobrecarga para Node.js.
- **Mocha**: Ferramenta para testar automaticamente endpoints e funcionalidades de APIs.
- **Zod**: Biblioteca para validação e parsing de esquemas em JavaScript e TypeScript.
- **Swagger**: Documentação automática da API.

## Configuração do Ambiente

Para configurar e executar este projeto em seu ambiente local, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:BrenoFlaubert/nodejs-multi-data-sources.git
   cd nodejs-multi-data-sources
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e configure as variáveis conforme o exemplo em `.env.example`.

4. **Inicie os contêineres Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Execute os testes automatizados:**
   ```bash
   npm test
   ```

6. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
