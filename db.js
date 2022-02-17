const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log("Connection to Database Successful");
  } catch (error) {
    console.log(error);
    console.log("Failed Connection to Database")
  }
};
