const { getUser} = require("../services/auth");

const isValidUser = async (req, res, next) => {
    const id = req.cookies.uid;
    if(!id) return res.redirect("/invaliduser");

    const user = getUser(id);
    if(!user) return res.redirect("/invaliduser");

    req.user = user;
    next();
}

module.exports = {
    isValidUser,
}
