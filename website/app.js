/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '5b5c9875d7e328484f0b89d44e752635&units=imperial';
const url = 'http://localhost:8080';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const retrieveData = async (url) => {
    await fetch(url + '/getData').then(
        async (res) => {
           const data = await res.json();
           console.log(data);
            return data
        }
    )
}

retrieveData(url);
