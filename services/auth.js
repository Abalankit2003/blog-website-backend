const jwt = require("jsonwebtoken");
const secret = "ankit$raj";

const setUser = (user) => {
   const payload = jwt.sign({
    _id : user._id,
    email : user.email,
   }, secret);
   return payload;
}

const getUser = (token) => {
    if(!token) return null;
    try {
        const user = jwt.verify(token, secret);
        if(!user) return null;
        return user;
    } catch (error) {
      return null;
    }
}

module.exports = {
  setUser,
  getUser,
};