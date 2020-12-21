const request = require("request");

//  WeatherAPI from weatherapi.com

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherapi.com/v1/forecast.json?key=10d6a473adec46459d930339201912&q=
    ${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&days=1`;
	// console.log(url);

	request(
		{
			url,
			json: true,
		},
		(error, { body }) => {
			if (error) {
				callback("Unable to connect weather API");
			} else if (body.error) {
				callback(body.error.message);
			} else {
				const maxTemp = body.forecast.forecastday[0].day.maxtemp_c;
				const currentDegrees = body.current.temp_c;
				const chanceOfRain =
					body.forecast.forecastday[0].day.daily_chance_of_rain;
				const daySummary = body.forecast.forecastday[0].day.condition.text;

				callback(
					undefined,
					`Max Temp is ${maxTemp}, ${daySummary}, its currently ${currentDegrees} degrees out.\n\nChance of rain ${chanceOfRain}%`
				);
			}
		}
	);
};

module.exports = forecast;
