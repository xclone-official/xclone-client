const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageModel);
