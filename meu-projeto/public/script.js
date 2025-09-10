// ================================
// Seleção de elementos do DOM
// ================================
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

// ================================
// Funções
// ================================

// Busca os dados do clima no backend
const getWeatherData = async (city) => {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  
  if (!res.ok) throw new Error("Cidade não encontrada");

  const data = await res.json();
  return data;
};

// Exibe os dados do clima no frontend
const showWeatherData = async (city) => {
  try {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = Math.round(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
      'src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute(
      'src', `https://flagsapi.com/${data.sys.country}/flat/64.png`
    );
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove('hide');
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: err.message,
    });
  }
};

// ================================
// Eventos
// ================================

// Clique no botão de busca
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) showWeatherData(city);
});

// Pressionar Enter no input
cityInput.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    const city = cityInput.value.trim();
    if (city) showWeatherData(city);
  }
});

