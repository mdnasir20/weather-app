window.addEventListener("load", () => {

  let lon;
  let lat;
  const KELVIN = 273;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      let notificationElement = document.querySelector(".notification");
      let descriptionElement = document.querySelector(".temperature-description");
      let iconElement = document.querySelector(".weather-icons");
      let tempvaluElement = document.querySelector(".temperature-valu");
      let locationElement = document.querySelector(".location");

      let api = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=645d10a03f7a7eeac882013b044bdc6d`;
      
      fetch(api)
        .then((Response) => {
          let data = Response.json();
          return data
        })
        .then((data) => {
          weather.temperature.value = Math.floor(data.main.temp - KELVIN);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
        });
        .then(displayWeather => {
          iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
          tempvaluElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
          descriptionElement.innerHTML = weather.description;
          locationElement.innerHTML = `${weather.city}, ${weather.country}`;
        })


    })
  }
})

function celsiusToFahrenheit(temperature) {
  return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius"
  }
});

