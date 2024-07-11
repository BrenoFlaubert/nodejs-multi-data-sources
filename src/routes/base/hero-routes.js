const { z } = require('zod');

const heroSchema = z.object({
  heroName: z.string().min(3).max(100),
  heroPower: z.string().min(3).max(100),
});

async function routes(app, options) {
  app.get("/heros", async (request, reply) => {
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
  });
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
}

module.exports = routes;
