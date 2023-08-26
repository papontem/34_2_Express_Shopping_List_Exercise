process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
const items = require("../decoyShoppingListItemsDb");

let pickles = { name: "Pickles", price: 6.99 };

beforeEach(function () {
	items.push(pickles);
});

afterEach(function () {
	// console.log("Going to axe:", items);
	items.length = 0;
	// console.log("Axed:", items);
});

// GET
describe("GET /items", () => {
	test("Get all items", async () => {
		// making supertest requests takes some time, they are asynchronous so we use are able await them.
		const res = await request(app).get("/items");
		// now we use the test epectations weve been using
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ items: [pickles] });

		// and if we want to include debugger tools from chrome while we run our just tests,
		// use the command:
		// $ node --inspect-brk $(which jest) --runInBand items.test.js
		// to add a breack point at the begining

		// Or to add a breack point wherever
		// debugger;
		// $ node --inspect $(which jest) --runInBand items.test.js
		//
	});
});
describe("GET /items/:name", () => {
	test("Get item by name", async () => {
		const res = await request(app).get(`/items/${pickles.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ name: pickles.name, price: pickles.price });
	});
	test("Responds with 404 for invalid item", async () => {
		const res = await request(app).get(`/items/digiornos`);
		expect(res.statusCode).toBe(404);
	});
});

// POST
describe("POST /items", () => {
	test("Creating a item", async () => {
		// making a post, and sending the neccessary json data
		const res = await request(app)
			.post("/items")
			.send({ name: "Doritos", price: 5.48 });

		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ added: { name: "Doritos", price: 5.48 } });
	});
	test("Responds with 400 if name and price are missing", async () => {
		const res = await request(app).post("/items").send({});
		expect(res.statusCode).toBe(400);
	});

    
    test("Creating an item with NaN price", async () => {
        const res = await request(app)
            .post("/items")
            .send({ name: "Chips", price: "invalid" });
        expect(res.statusCode).toBe(400);
    });

    test("Creating an item with booleans for name and price", async () => {
        const res = await request(app)
            .post("/items")
            .send({name:true, price:false});
        expect(res.statusCode).toBe(400);
    });

});

// PATCH
describe("/PATCH /items/:name", () => {
	let monster = "Monster Energy Drink";

	test("Updating a item's name", async () => {
		const res = await request(app)
			.patch(`/items/${pickles.name}`)
			.send({ name: monster });
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({
			updated: { name: monster, price: pickles.price },
		});
	});
	test("Updating a item's name and price", async () => {
		const res = await request(app)
			.patch(`/items/${pickles.name}`)
			.send({ name: monster, price: 19.98 });
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ updated: { name: monster, price: 19.98 } });
	});
	test("Responds with 404 for invalid name", async () => {
		const res = await request(app)
			.patch(`/items/Piggles`)
			.send({ name: monster });
		expect(res.statusCode).toBe(404);
	});
});

// DELETE
describe("/DELETE /items/:name", () => {
	test("Deleting a item", async () => {
		const res = await request(app).delete(`/items/${pickles.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ message: "Deleted" });
	});
	test("Responds with 404 for deleting invalid item", async () => {
		const res = await request(app).delete(`/items/ham`);
		expect(res.statusCode).toBe(404);
	});
});
