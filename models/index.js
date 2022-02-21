const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  //Run connection (stays available when server starts)
  try {
    await mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log("Connection to Database");
  } catch (error) {
    console.log("Failed Connection to Database: ", error);
  }
};
