const fetch = require("node-fetch");

const asyncFetch = async (url) => (await fetch(url)).json();

module.exports = { asyncFetch };
