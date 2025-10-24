const inputVal = document.querySelector("#cityinput");
const btn = document.querySelector("#add");
const city = document.querySelector("#cityoutput");
const description = document.querySelector("#description");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const errorMsg = document.querySelector("#errorMsg");
const weatherIcon = document.querySelector("#weathericon");

const apiKey = "3045dd712ffe6e702e3245525ac7fa38";

// Convert Kelvin to Celsius
function kelvinToCelsius(val) {
  return (val - 273.15).toFixed(2);
}

btn.addEventListener("click", function () {
  const cityName = inputVal.value.trim();
  errorMsg.textContent = "";
  weatherIcon.style.display = "none";

  if (!cityName) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      city.textContent = `🌍 City: ${data.name}`;
      temp.textContent = `🌡️ Temperature: ${kelvinToCelsius(data.main.temp)} °C`;
      description.textContent = `🌤️ Conditions: ${data.weather[0].description}`;
      wind.textContent = `💨 Wind Speed: ${data.wind.speed} km/h`;

      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.style.display = "block";

      inputVal.value = "";
    })
    .catch(() => {
      errorMsg.textContent = "You entered an invalid city name.";
      city.textContent = "";
      temp.textContent = "";
      description.textContent = "";
      wind.textContent = "";
      weatherIcon.style.display = "none";
    });
});
