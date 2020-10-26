const Word = require("../models/word");
const { Router } = require("express");
const router = Router();

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
  res.json(await Word.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//delete route
router.delete("/:id", async (req, res) => {
  res.json(await Word.findByIdAndRemove(req.params.id));
});

// EXPORT ROUTER
module.exports = router;