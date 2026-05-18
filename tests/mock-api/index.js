const fs = await import("fs");
const path = await import("path");
const bodyParser = await import("body-parser");

module.exports = (app) => {
	app.use(bodyParser.json());
	// Register all routes inside tests/mock-api/routes.
	fs.readdirSync(path.join(__dirname, "routes")).forEach(
		async (routeFileName) => {
			if (/\.js$/.test(routeFileName)) {
				await import(`./routes/${routeFileName}`)(app);
			}
		},
	);
};
