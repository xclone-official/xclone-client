const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
// Connection
require("./connection/conn");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
const corsOptions = {
  origin: "http://localhost:3000", // ReactJS URL
};
app.use(cors(corsOptions)); // Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/", (req, res) => {
  res.send({
    msg: "Working",
  });
});

// Necessary Routes
// User actions routes
app.use("/user/auth", require("./auth/auth"));

// Tweet actions
app.use("/tweetaction", require("./tweetActions/tweetActions"));

// activate account
app.use("/activateAccount", require("./activateaccount/activateaccount"));

// User relationships
app.use(
  "/relationship",
  require("./userRelationshipApis/userRelationshipApis")
);

// Like And Unlike Tweet

app.use("/tweetinteractions", require("./InteractWithTweet/interactwithtweet"));

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
