const express = require("express");
const emoteController = require("../controllers/emote");

const router = express.Router();

router.get("/", emoteController.searchEmotes);

router.get("/:id", emoteController.getEmote);

router.post("/random", emoteController.sampleEmotes);

module.exports = router;
