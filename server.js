import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

import { getJson } from "serpapi";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const apiURL = "http://api.weatherapi.com/v1/forecast.json";
const apiKey = "7a4347939bdd4f3b802182054242405";
const baseApiURL = "http://api.weatherapi.com/v1/current.json";
const forecastCity = "Ankara";
const forecastApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${forecastCity}?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=W7ZRMC885VXMUSAWC95JCEJRE&options=beta&contentType=json`;

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(apiURL, {
      params: {
        q: "Ankara",
        key: apiKey,
        days: 6,
        aqi: "no",
        alerts: "no",
      },
    });
    const istanbul = await axios.get(baseApiURL, {
      params: {
        q: "Istanbul",
        key: apiKey,
        aqi: "no",
      },
    });
    const karabuk = await axios.get(baseApiURL, {
      params: {
        q: "Karabuk",
        key: apiKey,
        aqi: "no",
      },
    });
    const london = await axios.get(baseApiURL, {
      params: {
        q: "London",
        key: apiKey,
        aqi: "no",
      },
    });
    const tokyo = await axios.get(baseApiURL, {
      params: {
        q: "Tokyo",
        key: apiKey,
        aqi: "no",
      },
    });
    const berlin = await axios.get(baseApiURL, {
      params: {
        q: "Berlin",
        key: apiKey,
        aqi: "no",
      },
    });
    const paris = await axios.get(baseApiURL, {
      params: {
        q: "Paris",
        key: apiKey,
        aqi: "no",
      },
    });
    const rome = await axios.get(baseApiURL, {
      params: {
        q: "Rome",
        key: apiKey,
        aqi: "no",
      },
    });
    const result2 = await axios.get(
      "https://api.weatherbit.io/v2.0/forecast/daily?city=Ankara&key=1b479c7460904bb7a390cc2ecb7ef2b0"
    );

    const fullDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const moons = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(result2.data.data[0].datetime);
    result2.data.data[0].datetime = fullDays[date.getDay()];

    const date0 = new Date(result2.data.data[1].datetime);
    result2.data.data[1].datetime = days[date0.getDay()];

    const date1 = new Date(result2.data.data[2].datetime);
    result2.data.data[2].datetime = days[date1.getDay()];

    const date2 = new Date(result2.data.data[3].datetime);
    result2.data.data[3].datetime = days[date2.getDay()];

    const date3 = new Date(result2.data.data[4].datetime);
    result2.data.data[4].datetime = days[date3.getDay()];

    const date4 = new Date(result2.data.data[5].datetime);
    result2.data.data[5].datetime = days[date4.getDay()];

    var clock = result.data.location.localtime;
    clock = clock.split(" ")[1];

    var moon = result.data.location.localtime;
    moon = parseInt(moon.split("-")[1]);

    var day = result.data.location.localtime;
    day = parseInt(day.split("-")[2]);

    const monthDay = `${moons[moon - 1]} ${day}`;

    const response = await getJson({
      engine: "google_images",
      api_key:
        "e71f57e6bb22e83f8465501c595336e12d63a70a970df1a51727194f698e9dc1",
      q: "Ankara",
      location: "Ankara, Turkey",
    });

    const images = response.images_results;
    var counter = 0;
    const photos = [];

    for (var j = 0; counter < 5; j++) {
      if (images[j].original_width > 400) {
        photos[counter] = images[j].original;
        counter++;
      }
    }

    res.render("index.ejs", {
      content: result.data,
      istanbul: istanbul.data,
      karabuk: karabuk.data,
      london: london.data,
      tokyo: tokyo.data,
      berlin: berlin.data,
      paris: paris.data,
      rome: rome.data,
      forecast: result2.data,
      clock: clock,
      monthDay: monthDay,
      photos: photos,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/", async (req, res) => {
  let city = req.body.currentCity;
  if(!city || !city.trim() ) {
    city = "Ankara";
  }
  try {
    const result = await axios.get(apiURL, {
      params: {
        q: city,
        key: apiKey,
        days: 6,
        aqi: "no",
        alerts: "no",
      },
    });
    const istanbul = await axios.get(baseApiURL, {
      params: {
        q: "Istanbul",
        key: apiKey,
        aqi: "no",
      },
    });
    const karabuk = await axios.get(baseApiURL, {
      params: {
        q: "Karabuk",
        key: apiKey,
        aqi: "no",
      },
    });
    const london = await axios.get(baseApiURL, {
      params: {
        q: "London",
        key: apiKey,
        aqi: "no",
      },
    });
    const tokyo = await axios.get(baseApiURL, {
      params: {
        q: "Tokyo",
        key: apiKey,
        aqi: "no",
      },
    });
    const berlin = await axios.get(baseApiURL, {
      params: {
        q: "Berlin",
        key: apiKey,
        aqi: "no",
      },
    });
    const paris = await axios.get(baseApiURL, {
      params: {
        q: "Paris",
        key: apiKey,
        aqi: "no",
      },
    });
    const rome = await axios.get(baseApiURL, {
      params: {
        q: "Rome",
        key: apiKey,
        aqi: "no",
      },
    });

    const result2 = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=1b479c7460904bb7a390cc2ecb7ef2b0`
    );

    const fullDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const moons = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(result2.data.data[0].datetime);
    result2.data.data[0].datetime = fullDays[date.getDay()];

    const date0 = new Date(result2.data.data[1].datetime);
    result2.data.data[1].datetime = days[date0.getDay()];

    const date1 = new Date(result2.data.data[2].datetime);
    result2.data.data[2].datetime = days[date1.getDay()];

    const date2 = new Date(result2.data.data[3].datetime);
    result2.data.data[3].datetime = days[date2.getDay()];

    const date3 = new Date(result2.data.data[4].datetime);
    result2.data.data[4].datetime = days[date3.getDay()];

    const date4 = new Date(result2.data.data[5].datetime);
    result2.data.data[5].datetime = days[date4.getDay()];

    const date5 = new Date(result2.data.data[6].datetime);
    result2.data.data[6].datetime = days[date5.getDay()];

    var clock = result.data.location.localtime;
    clock = clock.split(" ")[1];

    var moon = result.data.location.localtime;
    moon = parseInt(moon.split("-")[1]);

    var day = result.data.location.localtime;
    day = parseInt(day.split("-")[2]);

    const monthDay = `${moons[moon - 1]} ${day}`;

    const response = await getJson({
      engine: "google_images",
      api_key:
        "e71f57e6bb22e83f8465501c595336e12d63a70a970df1a51727194f698e9dc1",
      q: city,
      location: "Turkey",
    });

    const images = response.images_results;
    var counter = 0;
    const photos = [];

    for (var j = 0; counter < 5; j++) {
      if (images[j].original_width > 400) {
        photos[counter] = images[j].original;
        counter++;
      }
    }

    res.render("index.ejs", {
      content: result.data,
      istanbul: istanbul.data,
      karabuk: karabuk.data,
      london: london.data,
      tokyo: tokyo.data,
      berlin: berlin.data,
      paris: paris.data,
      rome: rome.data,
      forecast: result2.data,
      clock: clock,
      monthDay: monthDay,
      photos: photos,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
