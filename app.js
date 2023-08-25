const express = require("express");
const ExpressError = require("./expressError");

// externall middleware request logger
const morgan = require("morgan");

const app = express();

// set app port
const port = 3001;
// Tell Express to parse all requests for json
app.use(express.json());
// callling the middleware, can also define the middleware function on the call
// requierement for using morgan loggaer
app.use(morgan("dev"));

// ROUTES
//get page icon
app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// home landing
app.get("/", (req, res, next) => {
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

// app.listen loop
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
// end app.listen
