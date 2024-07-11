const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui')
const path = require('path');
const app = require("fastify")({logger: true});
const routes = require('./routes/base/hero-routes');
const { ContextStrategy } = require('./db/strategies/base/contextStrategy');
const { MongoDB } = require('./db/strategies/mongodb/mongodb');
const { HeroSchema } = require('./db/strategies/mongodb/schemas/hero-schema');

const context = new ContextStrategy(new MongoDB(HeroSchema));
const PORT = 3000

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Heros API",
      description: "Heros API documentation",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ], 
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    tags: [
      {
        name: 'Hero',
        description: 'Hero endpoints'
      }
    ]
  }
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next();
    },
    preHandler: function (_request, _reply, next) {
      next();
    }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true
});
app.decorate('context', context)
app.register(routes)
const main = async () => {
  try {
    await app.listen({port: PORT})
    app.swagger();
    app.log.info(`server listening on port ${PORT}`);
    return app
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}
main()


