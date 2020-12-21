const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

// Define path for hbs (handle bars) config = default is `view` directory
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// rendering dynamic content using the hbs package
app.get("", (req, res) => {
	res.render("index", {
		title: "Weather Forecast",
		name: "Barklegne Eshetu",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "Developer.",
		name: "Barklegne Eshetu",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Documentation",
		name: "Barklegne Eshetu",
		message: "Official documentation for the weather app",
	});
});

app.get("/weather", (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({ error: "You must provide an address" });
	}

	geoCode(address, (error, { location, latitude, longitude } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error });
			}
			res.send({
				forecast: forecastData,
				location,
				address,
			});
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Documentation",
		name: "Barklegne Eshetu",
		message: "Documentation article not found here",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "Page not found",
		name: "Barklegne Eshetu",
		message: "The page you are looking for do not exist",
	});
});

app.listen(3000, () => {
	console.log("Server is up and running on port 3000");
});

//// OLD ROUTES
// app.get('', (req, res) => {
//     res.send('Hello express!');
// });

// app.get('/help', (req, res) => {
//     res.send('<h4> Help </h4>')
// });

// app.get('/about', (req, res) => {
//     res.send('<h4>About</h4>');
// });
