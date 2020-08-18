//*** Libraries ***//
const functions = require("firebase-functions");
const http = require("http");
const Fastify = require("fastify");
const { getCovidData } = require("./getCovidData");
const { getDB } = require("./getDB");

//*** Variables ***//

// Setup fastify firebase functions
let handleRequest = null;

const serverFactory = (handler, opts) => {
  handleRequest = handler;
  return http.createServer();
};

const fastify = Fastify({ serverFactory, logger: true });

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

//** ROUTERS **//
fastify.get("/data", async (req, reply) => {
  reply.send(covidData);
});

fastify.get("/", async (req, reply) => {
  let covidData = await getCovidData();
  let db = await getDB();

  reply.view("./views/index.hbs", {
    title: "Hello World",
  });
});

exports.app = functions.https.onRequest((req, res) => {
  fastify.ready((err) => {
    if (err) throw err;
    handleRequest(req, res);
  });
});
