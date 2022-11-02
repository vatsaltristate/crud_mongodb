const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
// var bodyParser = require('body-parser')
const mongoose = require("mongoose");
const userRouter = require("./router/user.router");
const PORT = 3620;

var corsOptions = {
  origin: "http://localhost:3620"
};


app.use(cors(corsOptions));

// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "CRUD Operation with mongodb" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});