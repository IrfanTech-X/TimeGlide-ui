let currentUnit = 'metric'; // metric = °C, imperial = °F

function updateClock() {
  const now = new Date();
  let hour = now.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  const h = String(hour).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('time').textContent = `${h}:${m}:${s} ${ampm}`;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('day').textContent = weekdays[now.getDay()];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById('timezone').textContent = timezone;

  let greeting = "Hello 👋";
  const currentHour = now.getHours();
  if (currentHour >= 5 && currentHour < 12) greeting = "Good Morning ☀️";
  else if (currentHour >= 12 && currentHour < 18) greeting = "Good Afternoon 🌤️";
  else greeting = "Good Evening 🌙";

  document.getElementById('greeting').textContent = greeting;
}

async function fetchWeather(unit = 'metric') {
  const city = 'Dhaka';
  const apiKey = 'dea48a80cf44b57a82b32b960c729c59'; // Replace with your OpenWeatherMap API key

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const rainVol = data.rain && data.rain['1h'] ? data.rain['1h'] : 0;
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('weather-temp').textContent = `${temp}°${unit === 'metric' ? 'C' : 'F'}`;
    document.getElementById('feels-like').textContent = `${feelsLike}°${unit === 'metric' ? 'C' : 'F'}`;
    document.getElementById('wind-speed').textContent = `${windSpeed} ${unit === 'metric' ? 'm/s' : 'mph'}`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('rain-volume').textContent = `${rainVol} mm`;
    document.getElementById('weather-desc').textContent = desc;
    document.getElementById('weather-icon').src = icon;

  } catch (error) {
    console.error('Failed to fetch weather:', error);
    document.getElementById('weather-desc').textContent = 'Weather Unavailable';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
  fetchWeather(currentUnit);

  document.getElementById('toggle-unit').addEventListener('click', () => {
    if (currentUnit === 'metric') {
      currentUnit = 'imperial';
      document.getElementById('toggle-unit').textContent = 'Show °C';
    } else {
      currentUnit = 'metric';
      document.getElementById('toggle-unit').textContent = 'Show °F';
    }
    fetchWeather(currentUnit);
  });
});
