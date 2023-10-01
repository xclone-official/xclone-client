const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default: "",
    },
    coverpic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "Hello World.",
    },
    location: {
      type: String,
      default: "",
    },
    bookmark: [],
    retweet: [],
    list: [],
    website: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "English",
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activateToken: {
      type: String,
      default: "",
    },
    following: [
      {
        name: {
          type: String,
          required: true,
        },
        bio: {
          type: String,
          required: true,
        },
        profile: {
          type: String,
          default: "",
        },
        username: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
    followers: [
      {
        name: {
          type: String,
          required: true,
        },
        bio: {
          type: String,
          required: true,
        },
        profile: {
          type: String,
          default: "",
        },
        username: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
    likedTweet: [
      {
        authorName: {
          type: String,
          required: true,
        },
        authorId: {
          type: String,
          required: true,
        },
        authorUsername: {
          type: String,
          required: true,
        },
        authorProfile: {
          type: String,
          required: true,
        },
        tweetId: {
          type: String,
          required: true,
        },
        tweet: {},
      },
    ],
    allNotifications: [
      {
        authorName: {
          type: String,
          required: true,
        },
        authorId: {
          type: String,
          required: true,
        },
        authorUsername: {
          type: String,
          required: true,
        },
        authorProfile: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        isSeen: {
          type: Boolean,
          default: false,
        },
        tweet: {},
        commentText: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

UserModel.pre("save", async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("userdata", UserModel);
