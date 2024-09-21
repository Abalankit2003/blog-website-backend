const { userModel, articleModel } = require("../models/user");
const {setUser} = require("../services/auth");


const handleUserLogin = async (req, res) => {
    try {
        const details = req.body;
        const user = await userModel.findOne({
            name: String(details.name),
            email : String(details.email),
            password : String(details.password),
        })

        // console.log(String(user._id));

        if(!user) return res.send("Enter correct details");
        const token = setUser(user);
        res.cookie("uid", token);
        return res.status(200).redirect("/");
        
    } catch (error) {
        console.log("Login error :: " , error);
    }
}

const handleUserSignUp = async (req, res) => {
    try {
        const details = req.body;
        const aUser = await userModel.create({
          name: details.name,
          email: details.email,
          password: details.password,
        });
        if (!aUser) return res.redirect("/signup");
        const token = setUser(aUser);
        res.cookie("uid", token);
        return res.status(201).redirect("/");
    } catch (error) {
        console.log("signup error :: error ::", error);
    }
}

const staticPage = (req, res) => {
    return res.render("static/home");
}

const homePage = async (req, res) => {
    const user = req.user;
    let userDetails = (await userModel.findById(user._id));
    const userName = userDetails?.name;
    const allArticles = await articleModel.find({}).exec();
    return res.render("home" , {allArticles, userName});
    // return res.json(allArticles);
}

const userSignUp = async (req, res) => {
    return res.render("static/signup");
}

const userLogin = (req, res) => {
    return res.render("static/user");
}

const handleReading = (req, res) => {
    return res.render("reading");
}

const handleNewArticle = async (req, res) => {
    try {
        const userId = req.user._id;

         const body = req.body;
         const article = await articleModel.create({
           writerId : userId,
           writer: body.writer,
           title: body.title,
           body: body.content,
           thumbnail: req.file.filename,
         }); 

         if(!article) return res.status(424).render("Error in uploading your article");
         return res.status(200).redirect("/"); 
    } catch (error) {
        console.log("article upload :: error :: " , error);
    }
}

const handleArticleForm = (req, res) => {
    return res.render("article");
}

const handleLogOut =  (req, res) => {
    res.clearCookie('uid');
    return res.redirect("/");
}

const handleMyBlogs = async (req, res) => {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    const myArticles = await articleModel.find({writerId : userId}).lean();
    // console.log(myArticles);
    // return res.end("Successful");
    if (JSON.stringify(myArticles) === "[]") return res.render("home", {allArticles : JSON.stringify(myArticles), userName : user?.name});
    return res.render("home", {allArticles : myArticles, userName : user?.name});
}


module.exports = {
  userSignUp,
  handleUserLogin,
  staticPage,
  homePage,
  handleUserSignUp,
  userLogin,
  handleReading,
  handleArticleForm,
  handleNewArticle,
  handleLogOut,
  handleMyBlogs,
};
