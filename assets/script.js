var APIKey = "3484fb7b5febe1605342141d4f9ba608"

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var city = document.getElementById('search-input').value;
  

    //https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
      .then(response => response.json())
      .then(data => {

        document.getElementById('result-text').textContent = city;
  
        var currentWeather = `
          <h3>Current Weather</h3>
          <p>Temperature: ${data.main.temperature} °C</p>
          <p>Humidity: ${data.main.humidity} %</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('result-content').innerHTML = currentWeather;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result-content').innerHTML = '<p>Error fetching weather data</p>';
      });
  });
  