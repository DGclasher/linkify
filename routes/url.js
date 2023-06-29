const router = require("express").Router();
const URL = require("../models/urls");
const { nanoid } = require("nanoid");

router.post("/", async (req, res) => {
  if (!req.body.url) return res.status(400).json({ message: "URL required" });
  const existingURL = await URL.findOne({ redirectURL: req.body.url });
  if(existingURL){
    res.status(200).json({message:"URL already existed", shortID: existingURL.shortId})
  }
  const shortID = nanoid(8);
  const newUrl = new URL({
    shortId: shortID,
    redirectURL: req.body.url,
  });
  try {
    await newUrl.save();
    res.status(200).json({ message: "URL generated", shortID: shortID });
  } catch (error) {}
});

module.exports = router;
