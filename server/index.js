const express = require("express");
const app = express();
// Connection
require("./connection/conn");
require("dotenv").config();
const cors = require("cors");
const httpServer = require("http").createServer(app);
express.json();
express.urlencoded({ extended: true });
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
let users = []; // Initialize an object to map user IDs to socket IDs

const addNewUser = (username, socketId) => {
  if (username) {
    !users.some((user) => user.username === username) &&
      users.push({ username, socketId });
  }
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
  return users?.find((user) => user.username === username);
};
io.on("connection", (socket) => {
  socket.on("connection", () => {
    console.log("Someone is connected");
  });

  socket.on("newUser", (username) => {
    // console.log("username", username);
    addNewUser(username, socket.id);
  });

  socket.on(
    "sendFollowNotification",
    async ({ senderUsername, receiverUsername, type }) => {
      const senderUser = await UserModel.findOne({ username: senderUsername });
      const receiverUser = await UserModel.findOne({
        username: receiverUsername,
      });
      const receiveUser = getUser(receiverUsername);
      console.log("users", users);
      console.log("receiveUser", receiveUser);
      if (senderUser && receiverUser && receiveUser) {
        const dataToPush = {
          authorName: senderUser.fullname,
          authorId: senderUser._id,
          authorUsername: senderUsername,
          authorProfile: senderUser.profilepicture,
          type: type,
          isSeen: false, // You can set this property accordingly
        };

        if (
          !receiverUser.allNotifications.some(
            (e) => e.authorUsername === senderUsername
          )
        ) {
          receiverUser.allNotifications.push(dataToPush);
          await receiverUser.save();
          io.to(receiveUser.socketId).emit("followed", dataToPush);
          console.log("receiveUser.socketId", receiveUser.socketId);
        } else {
          console.log("Notification already exists");
        }
      } else {
        console.log("User not found");
      }
    }
  );
  socket.on(
    "sendLikeNotification",
    async ({ senderUsername, receiverUsername, type }) => {
      const senderUser = await UserModel.findOne({ username: senderUsername });
      const receiverUser = await UserModel.findOne({
        username: receiverUsername,
      });
      const receiveUser = getUser(receiverUsername);
      console.log("users", users);
      console.log("receiveUser", receiveUser);
      if (senderUser && receiverUser && receiveUser) {
        const dataToPush = {
          authorName: senderUser.fullname,
          authorId: senderUser._id,
          authorUsername: senderUsername,
          authorProfile: senderUser.profilepicture,
          type: type,
          isSeen: false, // You can set this property accordingly
        };

        if (
          !receiverUser.allNotifications.some(
            (e) => e.authorUsername === senderUsername
          )
        ) {
          receiverUser.allNotifications.push(dataToPush);
          await receiverUser.save();
          io.to(receiveUser.socketId).emit("likedtweet", dataToPush);
          console.log("receiveUser.socketId", receiveUser.socketId);
        } else {
          console.log("Notification already exists");
        }
      } else {
        console.log("User not found");
      }
    }
  );
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
const PORT = process.env.PORT;

const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const UserModel = require("./Models/UserModel/UserModel");
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

const corsOptions = {
  origin: "http://localhost:3000", // ReactJS URL
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
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

httpServer.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
