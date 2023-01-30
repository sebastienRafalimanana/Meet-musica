const User = require("../model/user_model");
const Collection = require("../model/collection_model");
const ResponseMessage = require("../helpers/ResponseMessage");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");


const userQuery = {
  getAllUser: async () => {
    let users = await User.findAll({ raw: true});
    return users ;
  },
  userAuth: async (_,{userAuthInput},ctx,info)=>{
    console.log(userAuthInput.email);
    const user = await User.findOne({
      where:{
        [Op.and]:[
          {email:userAuthInput.email},
          {password:userAuthInput.password}
        ]
      }
    })

    if (user != null) {
      let userCollection =  await user.getCollection()
      console.log("user collection id:",userCollection.UserId);
      return  user.dataValues    }
    else{
       return user.dataValues
    }
  }


};

const userMutation = {
  //create account  
  createAccount: async (_, { createAccountInput }, ctx, info) => {
    const user = await User.findOne({
      raw: true,
      where: { email: createAccountInput.email },
    });
    if (user === null) {
      //creat new user account and new collection
      let newUser =  await User.create(createAccountInput);
      let newCollection = await Collection.create({UserId:newUser.id})//UserId is foreign key of collection entity
      await newUser.setCollection(newCollection)
      return new ResponseMessage(200, "ajout avec succé", newUser.dataValues, "SUCCESS");
    }
    else{
       let userExist = {
        id: 1,
        firstName: 'xxxxxxx',
        lastName: 'xxxxxx',
        email: 'xxxxxxxx.com',
        password: 'xxxxx',
        bio: 'xxxxxxxx',
        profil: 'xxxxxxxxxxxxx',
      }
      return new ResponseMessage(402,"Votre mail est déjà prise",userExist,"FAILLED");
    }
  },
  //change user profil
  changeUserProfil:async(_, { changeProfilInput }, ctx, info) => {
    const user = await User.findOne({
      raw: true,
      where: { email: changeProfilInput.email },
    });
    if (user != null) {
      await User.update({ profil: changeProfilInput.profil }, {
        where: {
          email: changeProfilInput.email 
        }
      });
      let userToUpdateProfile = await User.findOne({
        raw: true,
        where: { email: changeProfilInput.email },
      });
      console.log(user);
      return userToUpdateProfile
    }
  }
};

module.exports = { userQuery, userMutation };
