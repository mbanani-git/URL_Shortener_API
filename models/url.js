const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number,
});

module.exports = mongoose.model("Url", UrlSchema);
