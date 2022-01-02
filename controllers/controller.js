const Url = require("../models/url");
var qs = require("querystring");
const dns = require("dns");
var validUrl = require("valid-url");
const getUrl = async (req, res) => {
  let { url } = req.params;
  if (!Number.isInteger(Number(url))) {
    return res.status(500).json({ error: "wrong format" });
  }
  try {
    let urlID = await Url.findOne({ short_url: url });
    if (urlID) {
      return res.redirect(urlID.original_url);
    } else {
      return res.status(500).json({ error: "No short URL found for the given input" });
    }
  } catch (error) {
    console.log(error);
  }
};
const postUrl = async (req, res, next) => {
  try {
    // await Url.deleteMany({});
    const httpRegex = /^(http|https)(:\/\/)/;
    if (!httpRegex.test(req.body.url)) {
      return res.json({ error: "invalid url" });
    }
    let a = new URL(req.body.url);
    let hostname = a.hostname;
    dns.lookup(hostname, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Invalid hostname" });
      }
      let urlFind = await Url.findOne({ original_url: a });
      if (urlFind) {
        return res.status(201).json({ original_url: urlFind.original_url, short_url: urlFind.short_url });
      } else {
        let url = await Url.create({ original_url: a, short_url: Math.floor(Math.random() * 10000) });
        return res.status(201).json({ original_url: url.original_url, short_url: url.short_url });
      }
    });
  } catch (error) {
    return res.status(501).json({ error: "invalid url" });
  }
};

module.exports = { getUrl, postUrl };
