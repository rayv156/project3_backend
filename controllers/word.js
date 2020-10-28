const Word = require("../models/word");
const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const { APIKEY } = process.env;

//index route
router.get("/", async (req, res) => {
  res.json(await Word.find({}));
});

//create route
router.post("/", async (req, res) => {
  res.json(await Word.create(req.body));
});

//update route
router.put("/:id", async (req, res) => {
  res.json(
    await Word.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

//delete route
router.delete("/:id", async (req, res) => {
  res.json(await Word.findByIdAndRemove(req.params.id));
});

//route to populate with YouTube videos

router.get("/show/:word", (req, res) => {
  const maxResults = 3;
  const searchTerm = "how+to+say+" + req.params.word + "+in+sign+language";
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&maxResults=${maxResults}&q=${searchTerm}&key=${APIKEY}`
  )
    .then(
      (data) => data.json(),
      (err) => console.log("data", err)
    )
    .then(
      (results) => res.json(results),
      (err) => console.log("results", err)
    );
});

// EXPORT ROUTER
module.exports = router;
