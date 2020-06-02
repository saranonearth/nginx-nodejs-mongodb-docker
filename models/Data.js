const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  data: String,
});

module.exports = Data = mongoose.model("data", DataSchema);
