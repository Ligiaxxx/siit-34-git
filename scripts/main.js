const baseUrl = 'https://api.openweathermap.org/';
const apiKeyUrlPart = 'appid=39a23ba597f63de50a515f7018d90a14';
const weatherApiEndpoint = 'data/2.5/weather';

const searchForm = document.querySelector("[data-search-form]");
const tempDisplay = document.querySelector("[data-temp]");
const weatherIcon = document.querySelector("[data-icon]");
const cityNameDisplay = document.querySelector('[data-city-name]');
const weatherContainer = document.querySelector('[data-weather-container]');

searchForm.addEventListener("submit", handleSearch);

function handleSearch(e) {
  // searchForm ===e.target; sunt la fel
  e.preventDefault();
  const city = searchForm.children.search.value;
  getWeatherByCity(city);
}

//luam locatia curenta:
navigator.geolocation.getCurrentPosition(handleGeoSuccess, console.warn);

function handleGeoSuccess(geoPosition){
  //object destructuring:
 const {latitude: lat, longitude: lon} = geoPosition.coords;
 
getWeatherByCoords(lat, lon);
}

function getWeatherByCoords(lat, lon){
  const promise = fetch(
    `${baseUrl}/${weatherApiEndpoint}?lat=${lat}&lon=${lon}&units=metric&${apiKeyUrlPart}`
  );
  handleServerResponse(promise);
}

function getWeatherByCity(city = 'Arad') {
  const promise = fetch(
    `${baseUrl}/${weatherApiEndpoint}?q=${city},RO&units=metric&${apiKeyUrlPart}`
  );
  handleServerResponse(promise);
}

function handleServerResponse(promise){
  promise
    .then((resp) => {
      if (resp.ok === false) {
        console.warn(resp.status);
        throw new Error("Response from server was not ok");
      }
      return resp.json();
    }, console.warn) //primul then e de sacrificiu
    .then(handleResults) // al doilea then ne intereseaza care ne returneaza datele
    .catch(console.warn);

  function handleResults(data) {
    weatherContainer.classList.remove('hidden');
    console.log(data);

    tempDisplay.textContent = data.main.temp;
    const iconId = data.weather[0].icon;
    const iconName = data.weather[0].main;
    const imgSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    weatherIcon.src = imgSrc;
    weatherIcon.alt = `${iconName} icon`;
    cityNameDisplay.textContent = data.name;
  }
}
