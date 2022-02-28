const mongoose = require("mongoose");
// const mongoUri =
//   "mongodb+srv://Tmk5250:Tmk%409869865250@cluster0.bgmob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoUri =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";


const connection = () => {
  mongoose
    .connect(mongoUri ,()=>{
        console.log("monogdb connected succesfully");
    })
      
};

module.exports = connection;
