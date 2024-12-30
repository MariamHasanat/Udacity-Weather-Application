/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '5b5c9875d7e328484f0b89d44e752635&units=imperial';
const url = 'http://localhost:8080';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const retrieveData = async (url) => {
    const commingData = await fetch(url+'/getData', {
        method: 'GET'
    });
    try {
        // const response  = await commingData.json();
        console("retrieved data: ", commingData)
        return commingData
    } catch (error) {
        console.log("error in fetch the data in retrieve data function ", error)
    }
}

console.log(retrieveData(url));
 