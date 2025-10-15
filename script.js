const inputval = document.querySelector("#cityinput");
const btn = document.querySelector("#add");
const city = document.querySelector("#cityoutput");
const description = document.querySelector("#description");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");

const apik = "3045dd712ffe6e702e3245525ac7fa38";

// Convert Kelvin to Celsius
function conversion(val) {
  return (val - 273.15).toFixed(2);
}

btn.addEventListener("click", function () {
  const cityName = inputval.value.trim();

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`
  )
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const nameval = data.name;
      const descripVal = data.weather[0].description;
      const tempVal = data.main.temp;
      const wndspd = data.wind.speed;

      city.innerHTML = `🌍 City: ${nameval}`;
      temp.innerHTML = `🌡️ Temperature: ${conversion(tempVal)} °C`;
      description.innerHTML = `🌤️ Conditions: ${descripVal}`;
      wind.innerHTML = `💨 Wind Speed: ${wndspd} km/h`;
    })
    .catch((err) => {
      alert("You entered an invalid city name.");
      city.innerHTML = "";
      temp.innerHTML = "";
      description.innerHTML = "";
      wind.innerHTML = "";
    });
});
