const router = require("express").Router();
const URL = require("../models/urls");

router.get("/:shortId", async (req, res) => {
  try {
    const coll = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      { $inc: { timesClicked: 1 } }
    );
    if (coll.timesClicked > 5) {
      await URL.findOneAndDelete({ shortId: req.params.shortId });
      res.status(400).json({ message: "Limit exceeded" });
    }
    res.status(302).setHeader("Location", coll.redirectURL).end();
  } catch (error) {
    res.status(404).json({ message: "URL not found" });
  }
});

module.exports = router;
