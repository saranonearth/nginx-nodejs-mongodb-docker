const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  value: String,
});

module.exports = Data = mongoose.model("data", DataSchema);
