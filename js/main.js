
const apiKey = "d8d0b11c53a04d61b33144534252404";
const baseUrl = "https://api.weatherapi.com/v1";
const forecastContainer = document.getElementById("forecast");
const input = document.querySelector(".search-bar input");
const button = document.querySelector(".search-bar button");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function fetchWeather(query) {
  try {
    const response = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${query}&days=3`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    displayForecast(data);
  } catch (err) {
    forecastContainer.innerHTML = `<div class="text-white text-center w-100">Error: ${err.message}</div>`;
  }
}

function displayForecast(data) {
  const location = data.location;
  const current = data.current;
  const forecast = data.forecast.forecastday;

  forecastContainer.innerHTML = "";

  const todayDate = new Date(current.last_updated.replace(" ", "T"));
  forecastContainer.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="forecast d-flex overflow-hidden flex-column align-items-center text-center text-white" 
           style="background-color: #1e202b; border-bottom-left-radius: 25px; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom-right-radius: 25px;">
        <div class="forecast-header d-flex justify-content-between pe-3 mb-5 p-2 w-100" 
             style="background-color: #42444e; border-top-left-radius: 25px; border-top-right-radius: 25px;">
          ${days[todayDate.getDay()]}
          <div>${todayDate.getDate()} ${months[todayDate.getMonth()]}</div>
        </div>
        <div class="forecast-content">
          <div class="location" style="font-size: 1.8rem; font-weight: bold;">${location.name}</div>
          <div class="degree">
            <div class="num">${current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
              <img src="https:${current.condition.icon}" width="90" />
            </div>
          </div>
          <div class="custom">${current.condition.text}</div>
          <span><img src="../weather-app/imgs/icon-umberella.png" alt="Rain" />20%</span>
          <span><img src="../weather-app/imgs/icon-wind.png" alt="Wind" />${current.wind_kph}km/h</span>
          <span><img src="../weather-app/imgs/icon-compass.png" alt="Direction" />${current.wind_dir}</span>
        </div>
      </div>
    </div>`;

  for (let i = 1; i <= 2; i++) {
    const dayData = forecast[i];
    const date = new Date(dayData.date);
    forecastContainer.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="forecast d-flex overflow-hidden flex-column align-items-center text-center text-white" 
             style="background-color: ${i === 1 ? '#212436' : '#1e202b'}; border-bottom-left-radius: 25px; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom-right-radius: 25px;">
          <div class="forecast-header mb-5 p-2 w-100" 
               style="background-color: ${i === 2 ? '#42444e' : '#2c2d36'}; border-top-left-radius: 25px; border-top-right-radius: 25px;">
            ${days[date.getDay()]}
          </div>
          <div class="forecast-content">
            <div class="forecast-icon">
              <img src="https:${dayData.day.condition.icon}" width="48" />
            </div>
            <div class="degree">${dayData.day.avgtemp_c}<sup>o</sup>C</div>
            <div class="custom">${dayData.day.condition.text}</div>
            <span><img src="../weather-app/imgs/icon-umberella.png" alt="Rain" />20%</span>
            <span><img src="../weather-app/imgs/icon-wind.png" alt="Wind" />${dayData.day.maxwind_kph}km/h</span>
            <span><img src="../weather-app/imgs/icon-compass.png" alt="Direction" />${data.current.wind_dir}</span>
          </div>
        </div>
      </div>`;
  }
}

input.addEventListener("keyup", e => {
  if (e.key === "Enter") fetchWeather(input.value.trim());
});
button.addEventListener("click", () => {
  fetchWeather(input.value.trim());
});

fetchWeather("Cairo");
