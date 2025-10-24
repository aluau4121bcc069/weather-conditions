document.addEventListener("DOMContentLoaded", function() {
  const inputVal = document.getElementById("cityinput");
  const btn = document.getElementById("add");
  const city = document.getElementById("cityoutput");
  const description = document.getElementById("description");
  const temp = document.getElementById("temp");
  const wind = document.getElementById("wind");
  const errorMsg = document.getElementById("errorMsg");

  const apiKey = "3045dd712ffe6e702e3245525ac7fa38"; // replace if needed

  function kelvinToCelsius(val) {
    return (val - 273.15).toFixed(2);
  }

  btn.addEventListener("click", function() {
    const cityName = inputVal.value.trim();
    errorMsg.textContent = "";
    
    if (!cityName) {
      errorMsg.textContent = "Please enter a city name.";
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(data => {
        city.textContent = `🌍 City: ${data.name}`;
        temp.textContent = `🌡️ Temperature: ${kelvinToCelsius(data.main.temp)} °C`;
        description.textContent = `🌤️ Conditions: ${data.weather[0].description}`;
        wind.textContent = `💨 Wind Speed: ${data.wind.speed} km/h`;
        inputVal.value = "";
      })
      .catch(() => {
        errorMsg.textContent = "You entered an invalid city name.";
        city.textContent = "";
        temp.textContent = "";
        description.textContent = "";
        wind.textContent = "";
      });
  });
});
