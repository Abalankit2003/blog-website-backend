const connection = require("./connection");
const path = require("path");
const express = require("express");
const route = require("./routes/user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("storage"));
app.use(express.static("views"));
app.use(cookieParser());
app.use(cors());
app.use("/css", express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));

app.use("/", route);
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
