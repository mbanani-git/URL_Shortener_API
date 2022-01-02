const express = require("express");

const router = express.Router();

const { getUrl, postUrl, sendUrl } = require("../controllers/controller");

router.get("/api/shorturl/:url", getUrl);
router.post("/api/shorturl", postUrl);
module.exports = router;
