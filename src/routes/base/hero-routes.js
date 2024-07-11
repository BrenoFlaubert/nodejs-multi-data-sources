const { z, string } = require('zod');

const heroSchema = z.object({
  heroName: z.string().min(3).max(100),
  heroPower: z.string().min(3).max(100),
});

async function routes(app, options) {
  app.get(
    "/heros",
    // {
    //   schema: {
    //     description:
    //       "Get a user by name and takes limit and skip as optional query parameters",
    //     tags: ["Heros"],
    //     summary: "Gets hero information",
    //     params: {},
    //     querystring: {
    //       type: "object",
    //       properties: {
    //         limit: { type: "string" },
    //         skip: { type: "string" },
    //       },
    //     },
    //     response: {
    //       200: {
    //         description: "Successful response",
    //         type: "array",
    //         heros: {
    //           type: "object",
    //           properties: {
    //             _id: { type: "string", format: "uuid" },
    //             heroName: { type: "string" },
    //             heroPower: { type: "string" },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    async (request, reply) => {
      const { nome, skip, limit } = request.query;
      let query = {};
      if (nome) {
        query.nome = nome;
      }
      const response = await app.context.read(
        query,
        parseInt(skip),
        parseInt(limit)
      );
      reply.send(response).status(200);
    }
  );
  app.post("/heros", async (request) => {
    try {
      const { heroName, heroPower } = heroSchema.parse(request.body);
      const response = await app.context.create({ heroName, heroPower });
      return {
        message: "Heroi cadastrado com sucesso!",
      };
    } catch (error) {
      console.log("error: ", error);
      return "Internal Error";
    }
  });
  app.patch('/heros/:id', async (request) => {
    const validationSchema = z.object({
      id: z.string()
    })
    try {
      const { id } = validationSchema.parse(request.params)
      const heroUpdate = heroSchema.parse(request.body)
      await app.context.update(id, heroUpdate)
      return {
        message: 'Heroi atualizado com sucesso!'
      }
    } catch (error) {
      console.error('error: ', error )
      return 'Erro Interno'
    }
  });
  app.delete('/heros/:id', async (request) => {
    const validationSchema = z.object({
      id: z.string()
    })
    try {
      const { id } = validationSchema.parse(request.params)
      await app.context.delete(id)
      return {
        message: 'Heroi deletado com sucesso!'
      }
    } catch (error) {
      console.error('error: ', error )
      return 'Erro Interno'
    }
  })
}

module.exports = routes;
