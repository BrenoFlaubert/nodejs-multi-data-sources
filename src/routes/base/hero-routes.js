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
}

module.exports = routes;
