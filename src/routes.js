const express = require("express");

const routes = express();
const requests = require("./controllers/requests");

routes.get("/", requests.showPendingRequets);
routes.get("/register", requests.registerPendingRequests);

module.exports = routes;
