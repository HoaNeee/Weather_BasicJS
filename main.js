const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const search = document.querySelector(".search-box button");
const weatherDetails = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", (e) => {
  const apiKey = "f72f4925b58aaddee80d35fab636ca96";
  const city = document.querySelector(".search-box input").value;
  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "400px";
        error404.style.display = "block";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperture = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-detail .humidity span");
      const wind = document.querySelector(".weather-detail .wind span");

      switch (data.weather[0].main) {
        case "Clouds":
          image.src = "./images/cloudy.png";
          break;
        case "Rain":
          image.src = "./images/rain.png";
          break;
        case "Clear":
          image.src = "./images/clear.png";
          break;
        case "Snow":
          image.src = "./images/snow.png";
          break;
        case "Haze":
          image.src = "./images/mist.png";
          break;
        default:
          image.src = "";
      }

      temperture.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
