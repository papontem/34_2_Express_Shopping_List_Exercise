const app = require("./app")

// set app port
const port = 3001;

// app.listen loop
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
// end app.listen