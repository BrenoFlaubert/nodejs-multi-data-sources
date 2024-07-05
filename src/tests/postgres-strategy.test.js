const assert = require("assert");
const { Postgres } = require("./../db/strategies/postgres/postgres");
const { ContextStrategy } = require("./../db/strategies/base/contextStrategy");
const { HeroSchema } = require('../db/strategies/postgres/schemas/hero-schema')
const context = new ContextStrategy(new Postgres(HeroSchema));
const MOCK_HERO = {
  heroName: "Naruto",
  heroPower: "Rasengan",
};
const MOCK_UPDATE = {
  heroName: "Naruto Uzumaki",
  heroPower: "Rasenganshuriken",
};
describe("Postgres Strategy", () => {
    before(async () => {
      await context.create(MOCK_UPDATE);
    })
    it("PostgreSQL connection", async () => {
        const result = await context.isConnected();
        assert.equal(result, true);
    });
    it("Create", async () => {
      const result = await context.create(MOCK_HERO);
      delete result.id;
      assert.deepEqual(result, MOCK_HERO);
    });
    it("Read", async () => {
        const expected = MOCK_HERO;
        const [result] = await context.read({ heroName: MOCK_HERO.heroName });
        delete result.id;
        assert.deepEqual(result, expected);
    });
    it("Update", async () => {
        const [result] = await context.read({});

        const novoItem = {
          ...MOCK_UPDATE,
          heroName: 'Mulher Maravilha',
        };
        const [update] = await context.update(result.id, novoItem);
    
        assert.deepEqual(update, 1);
    });
    it("Remove", async () => {
        const [ item ] = await context.read()
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
});
