const webService = require("../services/webService.js");

let handleRegister = async (req, res) => {
  let message = await webService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleLogin = async (req, res) => {
  let account = req.body.account;
  let password = req.body.password;
  console.log(account, " ", password);
  if (!account || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await webService.handleUserLogin(account, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleQuestion = async (req, res) => {
  console.log(req.body);
  let questions = await webService.handleAddQuestion(req.body);
  return res.status(200).json(questions);
};

let getQuestion = async(req,res) =>{
  let message = await webService.handleGetQuestion(req.body);
  return res.status(200).json(message)
}
module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  handleQuestion: handleQuestion,
  getQuestion:getQuestion,
};
