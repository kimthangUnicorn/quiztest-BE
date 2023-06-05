const express = require('express');
const quizController = require("../controllers/quizController.js");
let router = express.Router();
let initWebRoutes = (app) => {
  router.post("/api/register", quizController.handleRegister);
  router.post("/api/login", quizController.handleLogin);
  router.post("/api/create-question", quizController.handleQuestion);
  router.get("/api/get-questions",quizController.getQuestion)

  return app.use("/", router);
};
module.exports = initWebRoutes;
