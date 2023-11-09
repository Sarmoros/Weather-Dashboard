var APIKey = "3484fb7b5febe1605342141d4f9ba608"
  
    var cityInput = document.getElementById('search-input');
    var searchButton = document.getElementById('search-button');
    var citySearch = document.querySelector('.city-searches');
  

    //https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    function searchCity(city) {
        console.log("hello");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

        fetch(queryURL)
          .then((response) => {
            return response.json()
          })
          .then(data => {
            console.log(data);
            document.getElementById('result-text').textContent = city;
      
            var currentWeather = `
              <h3>Current Weather</h3>
              <p>Temperature: ${data.main.temp} °F</p>
              <p>Humidity: ${data.main.humidity} %</p>
              <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('result-content').innerHTML = currentWeather;

            var lat= data.coord.lat
            var lon=data.coord.lon
            //fetch("https://openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey).then((response)=> {
                //return response.json()
            //}) .then((weatherdata)=>{
                //console.log(weatherdata)
            //})
          })
          .catch(error => {
            console.error('Error:', error);
            document.getElementById('result-content').innerHTML = '<p>Error fetching weather data</p>';
          });
    }

    function saveHistory() {
        var historyText = cityInput.value.trim();
        var historyStorage = JSON.parse(localStorage.getItem("historyStorage")) || []
        historyStorage.push(historyText)
        localStorage.setItem("historyStorage", JSON.stringify(historyStorage))
        renderPastSearches(historyStorage);
    }

    function renderPastSearches(historyStorage) {
        historyStorage.forEach(eachSearch => {
            var historyButton = document.createElement('li');
            historyButton.textContent = eachSearch
            citySearch.appendChild(historyButton)

            historyButton.addEventListener("click", function(event){
                event.preventDefault()
                var pastButton = historyButton.textContent;
                searchCity(pastButton);
            })
        });    
    }


      searchButton.addEventListener('click', function(event) {
        event.preventDefault()
            var city = cityInput.value.trim();
            searchCity(city);
            saveHistory()
            cityInput = "";
      })
 
  