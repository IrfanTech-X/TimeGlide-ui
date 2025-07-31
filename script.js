function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('time').textContent = `${h}:${m}:${s}`;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('day').textContent = weekdays[now.getDay()];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById('timezone').textContent = timezone;

  let greeting = "Hello 👋";
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) greeting = "Good Morning ☀️";
  else if (hour >= 12 && hour < 18) greeting = "Good Afternoon 🌤️";
  else greeting = "Good Evening 🌙";

  document.getElementById('greeting').textContent = greeting;
}

setInterval(updateClock, 1000);
updateClock();
