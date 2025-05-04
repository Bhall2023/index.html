function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

let apiKey = "7689111d9btfeef8e4e3cc0cba8be0o7";

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      let temperature = Math.round(response.data.temperature.current);
      let cityName = response.data.city;

      let cityElement = document.querySelector("#current-city");
      cityElement.innerHTML = cityName;

      let tempElement = document.querySelector(".current-temperature-value");
      tempElement.innerHTML = temperature;
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request made but no response:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
