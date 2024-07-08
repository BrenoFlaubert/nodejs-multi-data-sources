const app = require("fastify")({logger: true});
const routes = require('./routes/base/hero-routes');
const { ContextStrategy } = require('./db/strategies/base/contextStrategy');
const { MongoDB } = require('./db/strategies/mongodb/mongodb');
const { HeroSchema } = require('./db/strategies/mongodb/schemas/hero-schema');

const context = new ContextStrategy(new MongoDB(HeroSchema));
const PORT = 3000

// registar as rotas
app.register(routes)
// passar o contexto do banco para as rotas
app.decorate('context', context)
// iniciar o servidor
const main = async () => {
  try {
    await app.listen({port: PORT})
    app.register(routes())
    app.log.info(`server listening on port ${PORT}`);
    return app
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}
main()


