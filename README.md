# Projeto Multi Banco de Dados

## Introdução

Bem-vindo ao projeto **Multi Banco de Dados**! Este projeto foi desenvolvido para demonstrar a integração de múltiplos bancos de dados utilizando o **Strategy Pattern**. Com ele, é possível gerenciar e operar com diferentes fontes de dados de maneira eficiente e organizada. A seguir, apresentamos os principais componentes e tecnologias utilizadas no projeto:

## Tecnologias Utilizadas

- **Multi Datasources Strategy Pattern**: Implementação do padrão de design Strategy para gerenciar múltiplas fontes de dados.
- **Testes Automatizados com Mocha**: Utilização do Mocha para a criação e execução de testes automatizados, garantindo a qualidade do código.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB, proporcionando uma maneira simples e poderosa de definir esquemas e interagir com o banco de dados.
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js que facilita a interação com bancos de dados SQL, incluindo Postgres.
- **MongoDB**: Banco de dados NoSQL orientado a documentos, conhecido por sua flexibilidade e escalabilidade.
- **Postgres**: Banco de dados relacional SQL altamente avançado, conhecido por sua robustez e conformidade com padrões SQL.
- **Docker e docker-compose**: Ferramentas de contêinerização que simplificam a configuração, a implantação e a execução de aplicações em ambientes isolados.

## Configuração do Ambiente

Para configurar e executar este projeto localmente, siga as instruções abaixo:

1. **Clone o repositório:**
   ```bash
   git clone
   cd 
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias conforme o exemplo fornecido em `.env.example`.

4. **Suba os contêineres Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Execute os testes automatizados:**
   ```bash
   npm test
   ```

