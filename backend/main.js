const express = require('express'),
app = express(),
cors = require('cors'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
mongoose = require ('mongoose'),
passport = require('passport'),
expressValidator = require('express-validator'),
morgan = require('morgan'),
methodOverride = require("method-override"),
router = require('./routes/index'),
User = require('./models/user')

// 変数関連の定義
const isTest = process.env.NODE_ENV === "test",
isDevelop = process.env.NODE_ENV === "develop",
isProduction = process.env.NODE_ENV === "production",
client = process.env.CLIENT_URL || "http://localhost:8080",
port = isTest ? 3001 : 3000;
require('dotenv').config();

// applicationの設定
app.use(morgan(":method :url :status * :response-time ms"))
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);
app.use(cookieParser(process.env.SECRET_PARSE_KEY))
app.use(expressSession({
  secret: process.env.SECRET_PARSE_KEY,
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(cors({
  origin: client
}))
// データベースの設定
// mongooseでES6のネイティブのPromiseを使用することを許可
mongoose.Promise = global.Promise
if (isTest) {
  // test環境データベース
  mongoose.connect(
    "mongodb://localhost:27017/todo_test",
    {
      useNewUrlParser: true,
    }
  )
}
if (isDevelop) {
  mongoose.connect(
    "mongodb://mongo:27017/todo_dev",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
}
if (isProduction) {
  mongoose.connect(
    "mongodb://mongo:27017/todo",
    {
      useNewUrlParser: true,
    }
  )
}

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB useing Mongoose");
})

app.use(expressValidator())
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ルーティングの設定
app.use("/", router)

// サーバーの起動
app.listen(port, () => {
  console.log(`the server is running at PORT: ${port}`);
})

module.exports = app;