//Variáveis e seleção de elementos.
const apiKey = '725bd263e8b8e1cdfe9ac258336dd7a8';
const apiCountryURL = 'https://flagsapi.com/BR/flat/64.png';

const cityInput = document.querySelector ('#city-input');
const searchBtn = document.querySelector ('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector ('#weather-data');

//Funçoes

//exibe API
    /*
        A função é async/await porque a API pode demorar para responder,Dessa forma, 
        o código "espera" a resposta sem travar a página inteira.
    */ 
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt`

        const res = await fetch(apiWeatherURL) // esperar o fetch da URL
        const data = await res.json();// Converte a resposta da API em JSON e transforma em um objeto JavaScript

        return data;
}


//funçao anonima arrow
const showWeatherData = async (city) => {
    try{
    const data = await getWeatherData(city);

    if (data.cod === "undefined") {
        alert('Cidade não encontrada!');
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        'src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute('src',`https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    weatherContainer.classList.remove('hide');
    }catch{
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Não foi possível buscar os dados do clima.",
    });
}
}

//Eventos 
//addEventListener serve para escutar eventos (como clique, digitação, envio de formulário etc).
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()  // impede o envio do form

    const city = cityInput.value;

    showWeatherData(city)
});
//Funçao da tecla ENTER
cityInput.addEventListener('keyup', (e) => {

    if(e.code === 'Enter'){
        const city = e.target.value

        showWeatherData(city);
    }
   
});

