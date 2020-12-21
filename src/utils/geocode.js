const request = require("request");

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiYmFya2xlZ25lIiwiYSI6ImNraXY3Z3UwNDAyYWgzMG54cGI2OHRyYzcifQ.H_3KRDLOIN3wSX0oqWfn8g&limit=1`;

	request(
		{
			url,
			json: true,
		},
		(error, { body }) => {
			if (error) {
				callback("Unable to connect Geocoding API", undefined);
			} else if (body.features.length === 0) {
				callback("Unable to fetch data, location not found!", undefined);
			} else {
				address = {
					location: body.features[0].place_name,
					latitude: body.features[0].center[1],
					longitude: body.features[0].center[0],
				};
				callback(undefined, address);
			}
		}
	);
	// callback(undefined, url);
};

module.exports = geoCode;
