process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
const items = require("../decoyShoppingListItemsDb");

let pickles = { name: "Pickles", price: 6.99 };

beforeEach(function () {
	items.push(pickles);
});

afterEach(function () {
	console.log("Going to axe:", items);
	items.length = 0;
	console.log("Axed:", items);
});

// GET

// POST

// PATCH

// DELETE
