const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../decoyShoopingListItemsDb");

// get all items
router.get("/", function (req, res) {
	res.json({ items });
});

module.exports = router;
