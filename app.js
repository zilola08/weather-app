const apiKey = "6d9a6f2f45891ae2a76eb65678bd8e0d";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;

const weatherDiv = document.querySelector(".weather");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherContent = `
<img src="images/rain.png" class="weather-icon" alt="">
<h1 class="temp">22°C</h1>
<h2 class="city">New York</h2>
<div class="details">
  <div class="col">
    <img src="images/humidity.png" alt="">
    <div>
      <p class="humidity">50%</p>
      <p>Humidity</p>
    </div>
  </div>
  <div class="col">
    <img src="images/wind.png" alt="">
    <div>
      <p class="wind">15 km/h</p>
      <p>Wind Speed</p>
    </div>
  </div>
</div>`;

const renderWeather = () => {
  return new Promise((resolve) => {
    resolve(weatherDiv.innerHTML = weatherContent);
  })
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
  console.log(response);
  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    return;
  }
  const data = await response.json();
  await renderWeather();
  const weatherIcon = document.querySelector(".weather-icon")
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  };
}


searchBtn.addEventListener("click",() => {
  checkWeather(searchBox.value);
});