const express = require("express");
const app = express();
const ExpressError = require("./expressError");

// externall middleware request logger
const morgan = require("morgan");

// import the express router for routes involving those used for items
const itemsRoutes = require("./routes/items")


// Tell Express to parse all requests for json
app.use(express.json());
// requierement for using morgan logger, setting environment to development
app.use(morgan("dev"));

// ROUTES
//get page icon
app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// set /items prefix for ease of route handling and editing 
app.use("/items", itemsRoutes);

// welcome msg
app.get("/", (req, res, next) => {
    
    console.log("Welcome to the Shopping List Local Api. Please take a look at the readme.md for instruction.");

	return res.send({
		message:
			"Welcome to the Shopping List Local Api. Please take a look at the readme.md for instruction.",
	});
});

// route not found 404 handler
app.use(function (req, res, next) {
	return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use(function (err, req, res, next) {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;

	// set the status and alert the user
	return res.status(status).json({
		error: {
			message: err.message,
			status: status,
		},
	});
});

module.exports = app;