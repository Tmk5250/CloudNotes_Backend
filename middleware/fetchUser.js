const jwt = require("jsonwebtoken");
const privateKey = "ThisIsThePrivateKey";

const fetchUser = async (req, res, next) => {
    let token = req.header("authToken");
    if(typeof token == null){
      return res.status(401)
    }
    jwt.verify(token, privateKey, (err, data) => {
      if (err) {
        return res.json({ err });
      } else {
        id = data.id;
        next();
      }
    });
};
module.exports = fetchUser;
