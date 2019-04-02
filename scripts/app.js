const apiKey = '601f1ea2f4321cd7c13c8a92ac8cfe54';
let weatherData = null;
function onSubmit(event) {
  if (event) event.preventDefault();
  let inputValue = event ? event.target[1].value : 'London';
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=imperial&APPID=${apiKey}`,
    success: function(data) {
      weatherData = data;

      setBgImg(weatherData.weather[0].main);
      document.getElementById('errorSpan').style.display = 'none';
      document.getElementById('location').innerText = weatherData.name;
      document.getElementById('icon').src = `http://openweathermap.org/img/w/${
        weatherData.weather[0].icon
      }.png`;
      const mainEle = document.getElementById('main');
      let temperature = parseInt(weatherData.main.temp);

      if (temperature < 32) fontColor = '#02003C';
      else if (temperature >= 32 && temperature < 86) fontColor = 'black';
      else if (temperature >= 86 && temperature < 100) fontColor = 'orange';
      else fontColor = 'red';

      mainEle.innerHTML = `${
        weatherData.weather[0].main
      }   ${temperature} <span>&#8457;</span>`;
      mainEle.style.color = fontColor;

      document.getElementById('other-infos').innerHTML = `
      <strong style='font-size:1.2em'>${
        weatherData.weather[0].description
      }</strong>
      <br></br>
      <small><span>Humidity: ${
        weatherData.main.humidity
      }</span>,    <span>Max Temperature: ${
        weatherData.main.temp_max
      }</span>,    <span>Min Temperature: ${
        weatherData.main.temp_min
      }</span>,    <span>Wind Degree: ${
        weatherData.wind.deg
      }</span>,    <span>Wind Speed: ${weatherData.wind.speed}</span></small>
      `;
    },
    error: function(params) {
      document.getElementById('errorSpan').style.display = 'block';
    }
  });
}
function setBgImg(weather) {
  let imgUrl = null;
  if (!weather) return null;

  switch (weather.toLowerCase()) {
    case 'clouds':
      imgUrl = 'cloudy.jpg';
      break;
    case 'snow':
      imgUrl = 'snow.jpg';
      break;
    case 'thunderstorm':
      imgUrl = 'storm.jpeg';
      break;
    case 'clear':
      imgUrl = 'clear.jpg';
      break;
    default:
      imgUrl = 'rainy.jpg';
      break;
  }
  document.getElementById('container').style[
    'background-image'
  ] = `url(../assests/images/bg_imgs/${imgUrl})`;
}

onSubmit();
