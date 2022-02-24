const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true},
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Favorite'}]
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
  requirementCount: 2,
}

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string()
          .alphanum()
          .min(5)
          .max(30)
          .required()
          .label('Username'),
    password: passwordComplexity(complexityOptions)
          .required()
          .label("Password"),
    firstName: Joi.string()
          .required()
          .label("First Name"),
    lastName: Joi.string()
          .required()
          .label("Last Name"),
    email: Joi.string()
          .required()
          .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
          .label("Email"),
    favorites: Joi.array()
          .label('Favorites')
  })

  return schema.validate(data);
};

module.exports = { User, validate };
