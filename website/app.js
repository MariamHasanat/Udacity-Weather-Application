/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '5b5c9875d7e328484f0b89d44e752635';
const url = 'http://localhost:3030';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
let zipCode = '';
let feel = '';
const zipCodeEvent = document.getElementById('zip').addEventListener('input', (e) => {
    zipCode = e.target.value;
});

const userFeelingInputs = document.getElementById('feelings').addEventListener('input', (e) => {
    feel = e.target.value;
});


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

        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(allData.temp) + ' °F';
        document.getElementById('content').innerHTML = "Feelings: " + allData.feel;
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
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
        const temp = weatherData.main.temp;
        return temp;

    } catch (error) {
        console.log('error in fetching weather data', error);

    }
}

document.getElementById('generate').addEventListener('click', async () => {
    if (!zipCode || !feel) {
        alert('Enter Zip code and User feelings!');
        return
    }
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
    
    await fetchWeatherData(baseUrl, zipCode, apiKey)
        .then(
            (temp) =>
                postData(url, {
                    temp: temp,
                    feel: feel,
                    date: newDate
                })
        ).then(
            () => retrieveData()
        ).catch(
            (error) => {
            console.log('error in fetching in generate button', error)
        })
});