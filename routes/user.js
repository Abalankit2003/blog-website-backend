const express = require("express");
const upload = require("../storage/user");
const {
  userSignUp,
  handleUserLogin,
  staticPage,
  homePage,
  handleUserSignUp,
  userLogin,
  handleReading,
  handleNewArticle,
  handleArticleForm,
  handleLogOut,
  handleMyBlogs,
} = require("../controllers/index");
const { isValidUser } = require("../middlewares/auth");

const route = express.Router();

route.get("/invaliduser", staticPage);

route.get("/signup", userSignUp);
route.get("/login", userLogin);
// route.get("/", homePage);
route.get("/", isValidUser, homePage);
route.get("/reading", isValidUser, handleReading);
route.get("/article", isValidUser, handleArticleForm);
route.get("/myblogs", isValidUser, handleMyBlogs);

route.post("/handlelogin", upload.none(), handleUserLogin);
route.post("/handlesignup", upload.none(), handleUserSignUp);
route.post(
  "/createarticle",
  isValidUser,
  upload.single("thumbnail"),
  handleNewArticle
);
route.post("/logout", isValidUser, handleLogOut);

module.exports = route;
