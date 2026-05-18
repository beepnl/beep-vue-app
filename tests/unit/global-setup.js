const app = await import("express")();

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	next();
});

await import("../mock-api")(app);

module.exports = () => {
	return new Promise((resolve, reject) => {
		global.mockApiServer = app.listen(import.meta.env.MOCK_API_PORT, resolve);
	});
};
