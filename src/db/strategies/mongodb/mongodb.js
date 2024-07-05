const { ICrud } = require("../interfaces/ICrud");
const Mongoose = require("mongoose");
require('dotenv').config()

const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando...",
  3: "Disconectando...",
  99: "Uninitialized",
};
class MongoDB extends ICrud {
  constructor(schema) {
    super();
    this._schema = schema;
    this._driver = null;
    this.connect();
  }
  async isConnected() {
    const state = STATUS[Mongoose.connection.readyState];
    if (state === "Conectado") {
      return state;
    }
    if (state !== "Conectando...") {
      return state;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return STATUS[Mongoose.connection.readyState];
  }
  async connect() {
    try {
      const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_ROOT_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`;
      await Mongoose.connect(uri, {
        authSource: "admin",
        user: `${process.env.MONGO_USERNAME}`,
        pass: `${process.env.MONGO_ROOT_PASS}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database is connected!");
    } catch (error) {
      console.log("Erro na conexão:", error);
    }
  }
  create(item) {
    return this._schema.create(item);
  }
  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit);
  }
  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }
  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = {
  MongoDB,
};
