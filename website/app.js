/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '5b5c9875d7e328484f0b89d44e752635&units=imperial';
const url = 'http://localhost:3030';

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

retrieveData(url);

const sentData = {name:'Frying-Neno'};

postData(url, sentData);
