const { HeroSchema } = require('../db/strategies/mongodb/schemas/hero-schema');
const { ContextStrategy } = require('../db/strategies/base/contextStrategy');
const { MongoDB } = require('../db/strategies/mongodb/mongodb');
const routes = require('../routes/base/hero-routes');
const assert = require('assert');
const fastify = require('fastify');

const MOCK_HERO = {
    heroName: 'Chapolin',
    heroPower: 'Marreta Bionica'
}

describe.only('Suite de testes da API Herois com MongoDB', function (){
    let app;
    let context;
    this.beforeAll(async () => {
        app = fastify()
        context = new ContextStrategy(new MongoDB(HeroSchema));
        await context.connect()
        app.decorate('context', context);
        app.register(routes)
        await app.ready()
    })
    this.afterAll(async () => {
        await app.close()
    })
    it('Create new Hero - POST /heros', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/heros',
            payload: MOCK_HERO
        })
        const statusCode = response.statusCode
        assert.ok(statusCode === 200)
        const { message } = JSON.parse(response.payload)
        assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
    })
    it('List all heros - GET /heros', async function () {
        const response = await app.inject({
            method: 'GET',
            url: '/heros'
        })
        const statusCode = response.statusCode
        assert.deepEqual(statusCode, 200)
        const data = JSON.parse(response.body)
        assert.ok(Array.isArray(data))
    })
    it('Pagination list 1 hero - GET /heros', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/heros?skip=0&limit=1'
        })
        const statusCode = response.statusCode
        assert.deepEqual(statusCode, 200)
        const data = JSON.parse(response.body)
        assert.ok(data.length === 1)
    })
})


