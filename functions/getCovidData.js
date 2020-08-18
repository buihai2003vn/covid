//*** Libraries ***//
const { asyncFetch } = require("./lib/asyncFetch");

//*** Variables ***//
//** Constant
// Get info about covid-19 global and in many country
const API = "https://api.covid19api.com/summary";

const getCovidData = async () => {
  let covidData = {};
  await asyncFetch(API).then((data) => {
    for (let category in data) {
      console.log(category);
      // Separate Global and Countries into many categories instead of only 2
      if (category === "Global") {
        covidData = { ...covidData, Global: data[category] };
      } else if (category === "Countries") {
        let countries = data[category];
        for (let country of countries) {
          let curCountryName = country.Country;
          covidData[curCountryName] = country;
        }
      } else {
        // Date category
        covidData = { ...covidData, Date: data[category] };
      }
    }
    // covidData = { ...covidData, ...data };
  });
  return covidData;
};

module.exports = {
  getCovidData,
};
