const apiKey = "api-key-removed-for-github"; 
let cache = {};

function getWeather() {
    const city = document.getElementById("city").value;
    const output = document.getElementById("output");

    if (cache[city]) {
        displayWeather(cache[city]);
        return;
    }

    output.textContent = "Loading...";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            cache[city] = data;
            displayWeather(data);
        })
        .catch(err => {
            output.textContent = "Error: " + err.message;
        });
}

function displayWeather(data) {
    const output = document.getElementById("output");
    output.innerHTML = `
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}
