const User = require("../model/user_model");
const ResponseMessage = require("../helpers/ResponseMessage");
const bcrypt = require("bcrypt")


const userQuery = {
  getAllUser: async () => {
    let users = await User.findAll({ raw: true });
    return users ;
  },
};

const userMutation = {
  createAccount: async (_, { createAccountInput }, ctx, info) => {
    const user = await User.findOne({
      raw: true,
      where: { email: createAccountInput.email },
    });
    if (user === null) {
      let newUser =  await User.create(createAccountInput);
      return new ResponseMessage(200, "ajout avec succé", newUser.dataValues, "SUCCESS");
    }
    else{ return new ResponseMessage(402,"Votre mail est déjà prise",_,"FAILLED");}
  },
};

module.exports = { userQuery, userMutation };
