// console.log("Client side javascript file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

// const weatherForecast =
// 	(location,
// 	() => {
// 		const url = `http://localhost:3000/weather?address=${location}`;
// 		fetch(url).then((response) => {
// 			response.json().then((data) => {
// 				if (data.error) {
// 					console.log(data.error);
// 				} else {
// 					console.log(data.location);
// 					console.log(data.forecast);
// 				}
// 			});
// 		});
// 		console.log(url);
// 	});

/* 
TODO: Convert the fetch code block to its own callback function 
TODO: So inside the event listener it can be called
*/
weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const location = search.value;
	const url = `http://localhost:3000/weather?address=${location}`;

	messageTwo.textContent = "Loading weather information...";
	fetch(url).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				// console.log(data.error);
				messageTwo.hidden = true;
				messageOne.textContent = data.error;
			} else {
				messageTwo.innerHTML = `${data.location}<br/><br/>${data.forecast}`;
			}
		});
	});
});
