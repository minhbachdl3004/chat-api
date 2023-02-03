const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: String,
      require: true,
    },
    sender_id: {
      type: String,
      require: true,
    },
    recipient_id: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
