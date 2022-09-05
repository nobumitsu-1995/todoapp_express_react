const express = require('express'),
app = express(),
mongoose = require ('mongoose'),
expressValidator = require('express-validator'),
morgan = require('morgan'),
methodOverride = require("method-override"),
router = require('./routes/index')

// 変数関連の定義
const isTest = process.env.NODE_ENV === "test",
isDevelop = process.env.NODE_ENV === "develop",
isProduction = process.env.NODE_ENV === "production",
port = isTest ? 3001 : 3000;

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

// データベースの設定
// mongooseでES6のネイティブのPromiseを使用することを許可
// mongoose.Promise = global.Promise
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
    "mongodb://localhost:27017/todo_dev",
    {
      useNewUrlParser: true,
    }
  )
}
if (isProduction) {
  mongoose.connect(
    "mongodb://localhost:27017/todo",
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

// ルーティングの設定
app.use("/", router)

// サーバーの起動
app.listen(port, () => {
  console.log(`the server is running at PORT: ${port}`);
})

module.exports = app;