const db = require("../models/index")
const bcrypt = require("bcryptjs");
const question = require("../models/question");

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.Users.create({
        account: data.account,
        password: hashPasswordFromBcrypt,
        role: data.role,
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (account, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await db.Users.findOne({
        attributes: [
          "id",
          "account",
          "password",
          "role",
        ],
        where: { account: account },
        raw: true,
      });
      if (user) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "Ok";
          delete user.password;
          userData.user = user;
        } else {
          userData.errCode = 2;
          userData.errMessage = "Password or username is incorrect";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "User's not found ";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleAddQuestion = (data) =>{
  return new Promise(async(resolve,reject)=>{
    try{
      if(!data){
        console.log("1");
        resolve({
          errCode:1,
          message:"Không có dữ liệu"
        })
      }else{
        // let question = data.question;
        console.log(data.length);
        if(data && data.length > 0 ){
        console.log("3");
        data = data.map((item)=>{
            // questions.question = item.question,
            // questions.answer1 = item.answer1,
            // questions.answer2 = item.answer2,
            // questions.answer3 = item.answer3,
            // questions.answer4 = item.answer4,
            // questions.answerCorrect = item.answerCorrect,
            return item;
          })
          await db.Questions.bulkCreate(data)
        }
      }
      resolve({
        errCode:0,
        message:"Lưu thành công"
      })
    }catch(e){
      reject(e)
    }
  })
}
let handleGetQuestion = () =>{
  return new Promise(async(resolve,reject)=>{
    try{
      let questions = await db.Questions.findAll({
        raw:true ,
        nest:true
      })
      resolve({
        errCode: 0,
        data: questions,
      });
    }catch(e){
      reject(e)
    }
  })
}
module.exports = {
  handleUserLogin: handleUserLogin,
  createNewUser: createNewUser,
  handleAddQuestion:handleAddQuestion,
  handleGetQuestion:handleGetQuestion
};
