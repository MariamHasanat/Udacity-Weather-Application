/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '5b5c9875d7e328484f0b89d44e752635';
const url = 'http://localhost:3030';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
let zipCode = '';
const zipCodeEvent = document.getElementById('zip').addEventListener('input', (e) => { 
    console.log(e.target.value); 
    zipCode = e.target.value;
    console.log('zipCode = ', zipCode);
    
});


const getData = async (url) => {
    await fetch(url + '/getData').then(
        async (res) => {
            const data = await res.json();
            console.log(data);
            return data
        }
    )
}

const postData = async (url, objectData) => {
    await fetch(url + '/postData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectData),
        credentials: 'same-origin'
    }).then(
        async (res) => {
            const response = await res.json();
            console.log(response);
            return response
        }
    )
}

const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

const fetchWeatherData = async (baseUrl, zipCode, apiKey) => {
    const urlWeather = `${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=imperial`; // Append your parameters

    const response = await fetch(urlWeather);
    try {
        const weatherData = await response.json();
        console.log(weatherData);
        // return weatherData;

    } catch (error) {
        console.log('error in fetching weather data', error);

    }
}

document.getElementById('generate').addEventListener('click', () => fetchWeatherData(baseUrl, zipCode, apiKey));