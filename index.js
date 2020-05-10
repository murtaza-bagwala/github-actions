require("dotenv").config();
const fetch = require("node-fetch");
const URL = require("url").URL;

const weatherToken = process.env.WEATHER_TOKEN;

const weatherURL = new URL(
	"https://samples.openweathermap.org/data/2.5/weather"
);
weatherURL.searchParams.set("appid", weatherToken);
weatherURL.searchParams.set("zip", "94040,us");

const generateWeatherMessage = weatherData => {
	return `The weather in ${weatherData.name} : ${weatherData.weather[0].description}
	 current tempreature is ${weatherData.main.temp}, with a low temp of
	 ${weatherData.main.temp_min} and a high of ${weatherData.main.temp_max}`;
};

const getWeatherData = async () => {
	const response = await fetch(weatherURL.toString());
	return response.json();
};

const main = async () => {
	const weatherData = await getWeatherData();
	const weatherMesg = generateWeatherMessage(weatherData);
	return console.log(weatherMesg);
};

main();
