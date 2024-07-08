
async function routes (app, options) {
    app.get("/heros", async (_, reply) => {
        const response = await app.context.read()
        reply.send(response).status(200)
    });
}

module.exports = routes