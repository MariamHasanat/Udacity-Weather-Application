/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '5b5c9875d7e328484f0b89d44e752635';
const url = 'http://localhost:3030';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
let zipCode = '';
const zipCodeEvent = document.getElementById('zip').addEventListener('input', (e) => {
    zipCode = e.target.value;
});

let userFeelings = '';
const userFeelingInputs = document.getElementById('feelings').addEventListener('input', (e) => {
    userFeelings = e.target.value;
});


const getData = async (url) => {
    await fetch(url + '/getData').then(
        async (res) => {
            const data = await res.json();
            return data
        }
    ).catch((error) => {
        console.log('error in get data function', error);
    })
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
            return response
        }
    ).catch((error) => {
        'error in post Data function', error
    })
}

const retrieveData = async () => {
    const request = await fetch(url + '/all');
    try {
        // Transform into JSON
        let allData = await request.json();
        allData = JSON.parse(allData);

        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = 'The temperature: ' + Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = "The user feelings: " + allData.feel;
        document.getElementById('date').innerHTML = 'The date: ' + allData.date;
    }
    catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

let weatherComingData = '';
let temp = '';

const fetchWeatherData = async (baseUrl, zipCode, apiKey) => {
    const urlWeather = `${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=imperial`; // Append your parameters

    const response = await fetch(urlWeather);
    try {
        const weatherData = await response.json();
        temp = weatherData.main.temp;
        return temp;

    } catch (error) {
        console.log('error in fetching weather data', error);

    }
}

document.getElementById('generate').addEventListener('click', async () => {
    if (!zipCode || !userFeelings) {
        alert('Enter Zip code and User feelings!');
        return
    }

    await fetchWeatherData(baseUrl, zipCode, apiKey)
        .then(
            (temp) => {
                postData(url, {
                    temp: temp,
                    feel: userFeelings,
                    date: newDate
                })
            }
        ).then(
            () => retrieveData()
        )
        .catch((err) => {
            console.log('error in fetching in generate button', error)
        })
});