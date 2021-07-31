const locationSearch = document.forms['locationSearch'];

locationSearch.addEventListener('submit',function(e,city){
    e.preventDefault(); 
    city = locationSearch.querySelector('input[type="text"]').value;
    getWeather(city)
})

function getWeather(place){
    let city = document.getElementById('city')
    let weather = document.getElementById('weather')
    let temperature = document.getElementById('temperature')
    let humidity = document.getElementById("humidity")
    
    let weatherInfo = document.getElementById('weatherInfo')
    let bodyBackground = document.querySelector('.bg')
    console.log(weatherInfo)


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=9edff1d7b77f470c4fdc9c150d4db3f7`, {mode:'cors'})
    .then(function(response){
        return(response.json());
    })
    .then(function(response){
        setBackground(response.weather[0].main,weatherInfo,bodyBackground)
        setGifBackground(response.weather[0].main,bodyBackground)
        console.log({response})
        temperature.innerHTML = Math.floor(response.main.temp) + '˚C'
        city.innerHTML = response.name
        weather.innerHTML = response.weather[0].main
        humidity.innerHTML = 'Humidity: '+ response.main.humidity +'%'
        
    })

}

function setGifBackground(weather_main, bodyBackground){
    // ---Using gifs----
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=5hDzPncTiUhsV1aycrhD0t9NQFE41U4h&s=${weather_main}+sky`, {mode: 'cors'})
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
            console.log({response})
            let url = response.data.images.original.url

            bodyBackground.style.backgroundImage = `url(${url})`
            console.log(bodyBackground.style.background)
        });

}


function setBackground(weather_main,weatherInfo,bodyBackground){

    if(weather_main==='Rain'){
        weatherInfo.style.background= 'linear-gradient(0deg, rgba(3,152,152,1) 2%, rgba(0,93,249,1) 81%, rgba(16,5,241,1) 99%)'
        // ----Preloaded Image----
        // bodyBackground.style.backgroundImage = 'url("assets/rainy_gif.jpeg")'

    } else if (weather_main === 'Clouds'){
        weatherInfo.style.background='linear-gradient(180deg, rgba(20,221,223,1) 0%, rgba(42,144,249,1) 54%, rgba(118,124,133,1) 92%)'
        // bodyBackground.style.backgroundImage = 'url("assets/cloudy.jpeg")'

    } else if(weather_main === 'Clear'){
        weatherInfo.style.background ='linear-gradient(0deg, rgba(5,251,251,1) 22%, rgba(0,249,210,1) 49%, rgba(5,241,207,1) 85%)'
        // bodyBackground.style.backgroundImage = 'url("assets/clear_sky.jpeg")'

    } else if (weather_main==='Sunny'){
        weatherInfo.style.background = 'linear-gradient(180deg, rgba(244,146,9,1) 0%, rgba(242,222,30,1) 52%)'
        // bodyBackground.style.backgroundImage = 'url("assets/sunny.jpeg")'
    }
}
