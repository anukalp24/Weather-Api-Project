let input = document.getElementById("input");
let btn = document.getElementById("btn");
let container = document.getElementById("container");
let error = document.getElementById("error");
let invalid = document.getElementById("invalid-input");
let section = document.getElementById("img-section");
let sunny = document.getElementById("sunny");
let cloudy = document.getElementById("cloudy");
let rainy = document.getElementById("rainy");
let mist = document.getElementById("mist");
let thunder = document.getElementById("rain-with-thunder");
let snowfall = document.getElementById("snowfall");

const api = async (city) => {
  let response;
  let data;
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=5da71fb6c82245aea4c125426261302&q=${city}&aqi=yes`;

    response = await fetch(url);
  } catch (err) {
    invalid.style.display = "block";
    invalid.innerHTML = "Unable to fetch weather data";
    return;
  }

  data = await response.json();
  if (data.error) {
    invalid.style.display = "block";
    return;
  }

  let condition = data.current.condition.text;
  update(condition);
  console.log(data);

  let aqi = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy for Sensitive Groups",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
  };
  let aqiIndex = data.current.air_quality["us-epa-index"];
  document.getElementById("country").innerHTML =
    data.location.name + ", " + data.location.country;
  document.getElementById("Humidity").innerHTML = data.current.humidity;
  document.getElementById("temp_c").innerHTML = data.current.temp_c;
  document.getElementById("temp_c2").innerHTML = data.current.temp_c;
  document.getElementById("condition").innerHTML = data.current.condition.text;
  document.getElementById("feelslike_c").innerHTML = data.current.feelslike_c;
  document.getElementById("air_quality").innerHTML = aqi[aqiIndex];

  document.getElementById("dewpoint_c").innerHTML = data.current.dewpoint_c;
  document.getElementById("wind_kph").innerHTML = data.current.wind_kph;
  document.getElementById("vis_km").innerHTML = data.current.vis_km;
  document.getElementById("uv").innerHTML = data.current.uv;
};

function checker() {
  if (input.value === "") {
    error.style.display = "block";
    invalid.style.display = "none";
    return false;
  } else {
    error.style.display = "none";
    invalid.style.display = "none";
    return true;
  }
}

function update(condition) {
  sunny.style.display = "none";
  mist.style.display = "none";
  rainy.style.display = "none";
  thunder.style.display = "none";
  cloudy.style.display = "none";
  snowfall.style.display = "none";

  if (/sunny|Sunny|Clear/.test(condition)) {
    sunny.style.display = "block";
    return;
  } else if (/Mist|fog|Fog/.test(condition)) {
    mist.style.display = "block";
    return;
  } else if (/rain|rainy|drizzle|raining/.test(condition)) {
    rainy.style.display = "block";
    return;
  } else if (/thunder|storm/.test(condition)) {
    thunder.style.display = "block";
    return;
  } else if (/Cloud|cloud|Cloudy|Overcast/.test(condition)) {
    cloudy.style.display = "block";
    return;
  } else if (/snow|Snow flakes|Snowfall/.test(condition)) {
    snowfall.style.display = "block";
    return;
  }
}

function execution() {
  api(input.value);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!checker()) return;
  execution();
});
api("india");
