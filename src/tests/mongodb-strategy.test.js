const assert = require("assert");
const Mongoose = require('mongoose');
const { MongoDB } = require("../db/strategies/mongodb/mongodb");
const { ContextStrategy } = require("../db/strategies/base/contextStrategy");
const { HeroSchema } = require('../db/strategies/mongodb/schemas/hero-schema')


const context = new ContextStrategy(new MongoDB(HeroSchema));

const MOCK_CREATE_HERO = {
  heroName: "Breno",
  heroPower: "Kimura",
};
const MOCK_UPDATE_HERO = {
  heroName: "Lucas",
  heroPower: "Triangle",
};

describe("MongoDB Hero tests", () => {
  it("Test connection", async () => {
    const expected = "Conectado";
    const result = await context.isConnected();
    assert.deepEqual(result, expected);
  });
  it("create", async () => {
    const { heroName, heroPower } = await context.create(MOCK_CREATE_HERO);
    assert.deepEqual({ heroName, heroPower }, MOCK_CREATE_HERO);
  });
  it("read", async () => {
    const [{ heroName, heroPower }] = await context.read({
      heroName: MOCK_CREATE_HERO.heroName,
    });
    assert.deepEqual({ heroName, heroPower }, MOCK_CREATE_HERO);
  });
  it("update", async () => {
    const { _id } = await context.create(MOCK_UPDATE_HERO)
    const result = await context.update(_id, {
      heroName: 'Bruno'
    })
    assert.deepEqual(result.modifiedCount, 1)
  })
  it("delete", async () => {
    const [{_id}] = await context.read()
    const result = await context.delete(_id)
    assert.deepEqual(result.deletedCount, 1)
  })
});
