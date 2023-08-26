const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../decoyShoopingListItemsDb");

// GET /items/
router.get("/", (req, res) => {
	res.json({ items });
});

// POST a new item to /items/
router.post("/", (req, res, next) => {
	try {
		// validate request body json
		// name
		if (!req.body.name) throw new ExpressError("name is required", 400);
		let name = req.body.name;

		// price
		if (!req.body.price) throw new ExpressError("price is required", 400);
		// attempt to turn into float
		let price = parseFloat(req.body.price);
		// if parseFloat returns NaN (not a number)
		if (isNaN(price)) {
			throw new ExpressError("price value must be numeric", 400);
		}
		// round to hundreths
		price = Math.round(price * 100) / 100;

		// create item
		const newItem = { name: name, price: price };

		// add item to shopping list
		items.push(newItem);

		// confirm with user the item posted
		return res.status(201).json({ added: newItem });
	} catch (error) {
		return next(error);
	}
});

// GET an item by /items/:name
router.get("/:name", function (req, res) {
    // attempt to find first item with matching name, case sensitive
	const foundItem = items.find((item) => item.name === req.params.name);
	if (foundItem === undefined) {
		throw new ExpressError("Item could not be found", 404);
	}

	res.json({ name: foundItem.name, price:foundItem.price });
});


// PATCH update or completely rewrite the item at /items/:name
router.patch("/:name", function (req, res) {



    // validate request body
    // name
    // attempt to find first item with matching name, case sensitive
	const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
		throw new ExpressError("Item could not be found", 404);
	}
    foundItem.name = req.body.name

    // price
    // was a price sent?
    if(req.body.price){
        // attempt to turn into float
        let price = parseFloat(req.body.price);
        // if parseFloat returns NaN (not a number)
        if (isNaN(price)) {
            throw new ExpressError("price value must be numeric", 400);
        }
        // round to hundreths
        price = Math.round(price * 100) / 100;

        // check if price is different from the found items price
        if(price != foundItem.price){
            // change it
            foundItem.price = price
        }
    }
    
    res.json({ updated: foundItem })
})

// >request

//     {
//         “name”:”itemC”,
//         “price”: 3.50
//     }
// >response

//     {
//         “updated”: {
//             “name”: “itemC”, “price”: 3.50
//             }
//     }
// DELETE /items/:name
// >response

//     {
//         message: “Deleted”
//     }

module.exports = router;
