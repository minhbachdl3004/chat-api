const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    users: {
      type: [String],
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
