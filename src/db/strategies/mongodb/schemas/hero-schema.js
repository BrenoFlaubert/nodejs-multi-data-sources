const Mongoose = require("mongoose");

const HeroModel = new Mongoose.Schema({
  heroName: {
    type: String,
    required: true,
  },
  heroPower: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    dafault: Date.now(),
  },
});

module.exports = { 
  HeroSchema: Mongoose.model("heroi", HeroModel)
}
