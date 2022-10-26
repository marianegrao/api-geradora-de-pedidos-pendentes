const express = require("express");

const routes = express();
const requests = require("./controllers/requests");

routes.get("/", requests.showPendingRequets);
routes.post("/register", requests.registerPendingRequests);

module.exports = routes;
