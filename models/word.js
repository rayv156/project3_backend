const { Schema, model } = require("mongoose");

//DOG SCHEMA
const wordSchema = new Schema(
  {
    word: String,
    img: String,
    user: String,
  },
  { timestamps: true }
);

//DOG MODEL
const Word = model("word", wordSchema);

//EXPORT MODEL
module.exports = Word;