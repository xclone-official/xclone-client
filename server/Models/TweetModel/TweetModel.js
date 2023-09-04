const mongoose = require("mongoose");
const TweetModel = mongoose.Schema(
  {
    tweetContent: {
      type: String,
      default: "",
    },
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
    likes: {
      type: [String],
    },
    comments: [
      {
        commentUsername: {
          type: String,
          required: true,
        },
        commentText: {
          type: String,
          required: true,
        },
        commentUserId: {
          type: String,
          required: true,
        },
        commentUserProfile: {
          type: String,
          default: "",
        },
        commentLike: [String],
        commentSeen: [String],
        replies: [
          {
            repliesUsername: {
              type: String,
              required: true,
            },
            repliesText: {
              type: String,
              required: true,
            },
            repliesUserId: {
              type: String,
              required: true,
            },
            repliesUserProfile: {
              type: String,
              default: "",
            },
            repliesLike: [String],
            repliesSeen: [String],
          },
        ],
      },
    ],
    photos: [
      {
        type: String,
        default: "",
      },
    ],
    video: [
      {
        type: String,
        default: "",
      },
    ],
    quotedTweet: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("tweetdata", TweetModel);
