const { ICrud } = require("./../interfaces/ICrud");
const { Sequelize } = require("sequelize");
require('dotenv').config();

class Postgres extends ICrud {
  constructor(schema) {
    super();
    this._connection = null;
    this._schema = schema;
    this._model = null;
    this.connect();
  }
  async create(item = {}) {
    const { dataValues } = await this._model.create(item)
    return dataValues
  }
  async read(item){
   return await this._model.findAll({where: item, raw: true});
  }
  async update(id, item){
    return this._model.update(item, { where: { id } });
  }
  async delete(id){
    const query = id ? { id } : {}
    const r = await this._model.destroy({where: query})
    return r
  }
  async defineModel() {
    this._model = this._connection.define(
      this._schema.name,
      this._schema.schema,
      this._schema.options
    );
    await this._model.sync();
  }
  async connect() {
    this._connection = new Sequelize(
      `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASS}@localhost:5421/${process.env.POSTGRES_DB_NAME}`
    );
    await this.defineModel()
  }
  async isConnected() {
    try {
      await this._connection.authenticate();
      console.log("Conexão bem-sucedida.");
      return true;
    } catch (error) {
      console.error("Não foi possível conectar ao banco de dados:", error);
      return false;
    }
  }
}

module.exports = {
  Postgres,
};
