const mongoose = require("mongoose");
const mongoUri =process.env.MONGO_URI_CLOUD_BASED
// const mongoUri ="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"; 


const connection = () => {
  mongoose
    .connect(mongoUri ,()=>{
        console.log("monogdb connected succesfully");
    })
      
};

module.exports = connection;
