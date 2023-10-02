const express = require("express");
const app = express();
const { users, getUser, removeUser, addNewUser } = require("./userStore");
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
module.exports = { io };
io.on("connection", (socket) => {
  socket.on("connection", () => {
    console.log("Someone is connected");
  });

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  // Follow socket
  socket.on(
    "sendFollowNotification",
    async ({ senderUsername, receiverUsername, tweet, type }) => {
      const senderUser = await UserModel.findOne({ username: senderUsername });
      const receiverUser = await UserModel.findOne({
        username: receiverUsername,
      });
      const receiveUser = getUser(receiverUsername);
      if (senderUser && receiverUser && receiveUser) {
        const dataToPush = {
          authorName: senderUser.fullname,
          authorId: senderUser._id,
          authorUsername: senderUsername,
          authorProfile: senderUser.profilepicture,
          tweet: tweet,
          type: type,

          isSeen: false, // You can set this property accordingly
        };

        if (
          !receiverUser.allNotifications.some(
            (e) =>
              e.authorUsername === senderUsername && e.type === dataToPush.type
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
  // Like
  socket.on(
    "sendLikeNotification",
    async ({ senderUsername, receiverUsername, tweet, type, tweetId }) => {
      const senderUser = await UserModel.findOne({ username: senderUsername });
      const receiverUser = await UserModel.findOne({
        username: receiverUsername,
      });
      const receiveUser = getUser(receiverUsername);
      console.log("userss", users);
      console.log("receiveUser", receiveUser);
      if (senderUser && receiverUser && receiveUser) {
        const dataToPush = {
          authorName: senderUser.fullname,
          authorId: senderUser._id,
          authorUsername: senderUsername,
          authorProfile: senderUser.profilepicture,
          type: type,
          tweet: tweet,
          tweetId: tweetId,
          isSeen: false, // You can set this property accordingly
        };

        if (
          !receiverUser.allNotifications.some(
            (e) =>
              e.authorUsername === senderUsername &&
              e.type === dataToPush.type &&
              e?.tweet?._id === tweetId
          )
        ) {
          receiverUser.allNotifications.push(dataToPush);
          await receiverUser.save();

          console.log("receiveUser.socketId", receiveUser.socketId);
        } else {
          console.log("Notification already exists");
        }
        io.to(receiveUser.socketId).emit("likedtweet", dataToPush);
        console.log("Can't add to db");
      } else {
        console.log("User not found");
      }
    }
  );
  // reply
  socket.on(
    "sendRepliesNotification",
    async ({
      senderUsername,
      receiverUsername,
      tweet,
      type,
      tweetId,
      commentText,
    }) => {
      const senderUser = await UserModel.findOne({ username: senderUsername });
      const receiverUser = await UserModel.findOne({
        username: receiverUsername,
      });
      const receiveUser = getUser(receiverUsername);
      console.log("userss", users);
      console.log("receiveUser", receiveUser);
      if (senderUser && receiverUser && receiveUser) {
        const dataToPush = {
          authorName: senderUser.fullname,
          authorId: senderUser._id,
          authorUsername: senderUsername,
          authorProfile: senderUser.profilepicture,
          type: type,
          tweet: tweet,
          tweetId: tweetId,
          commentText: commentText,
          isSeen: false, // You can set this property accordingly
        };
        console.log(senderUsername, receiverUsername);
        if (senderUsername === receiverUsername) {
          console.log("Can't add to db,", senderUsername, receiverUsername);
        } else {
          receiverUser.allNotifications.push(dataToPush);
          await receiverUser.save();

          console.log("receiveUser.socketId", receiveUser.socketId);

          io.to(receiveUser.socketId).emit("replytweet", dataToPush);
        }
      } else {
        console.log("User not found");
      }
    }
  );
  // Message
  socket.on(
    "saveAllMessages",
    async ({ senderusername, senderId, receiverId }) => {
      const receiveUser = getUser(senderusername);
      if ((senderId, receiveUser, receiverId)) {
        const allChats = await MessageModel.find({
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        });
        io.to(receiveUser?.socketId).emit("setAllMsg", allChats);
      } else {
        // console.log("Can't get msg");
      }
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });

  // AddMsg socket
  socket.on(
    "addMsg",
    async ({ senderId, senderUsername, receiverId, message }) => {
      console.log(senderId, senderUsername, receiverId, message);
      if (senderId && senderUsername && receiverId && message) {
        const senderUser = getUser(senderUsername);
        const receiverUser = await UserModel.findById(receiverId);

        if (receiverUser) {
          const getReceiverUser = getUser(receiverUser?.username);

          if (senderUser) {
            // Check if the recipient is online

            // Save the message to the database
            const newChat = await MessageModel({
              senderId,
              receiverId,
              message,
            });
            await newChat.save();

            const AllMsg = await MessageModel.find({
              $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
              ],
            });
            if (getReceiverUser) {
              // Recipient is online, broadcast immediately
              io.to(getReceiverUser.socketId).emit("sendAddMsg", AllMsg);
            }

            // Broadcast to sender and recipient (if online) for a chat history update

            io.to(senderUser?.socketId).emit("sendAddMsg", AllMsg);
          } else {
            console.log("Can't find user1");
          }
        } else {
          console.log("Can't find user2");
        }
      } else {
        console.log("Can't add msg");
      }
    }
  );
});

const PORT = process.env.PORT;

const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const UserModel = require("./Models/UserModel/UserModel");
const MessageModel = require("./Models/MessageModel/MessageModel");
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

// handle message
app.use("/api/message", require("./messageController/messageController"));
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
