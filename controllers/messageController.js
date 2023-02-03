const Message = require("../models/Message");

const createNewMessage = async (req, res) => {
  try {
    const newMessage = await new Message({
      conversation_id: req.body.conversation_id,
      sender_id: req.body.sender_id,
      recipient_id: req.body.recipient_id,
      message: req.body.message,
    });

    // Save new message to DB
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.id,
    });
    if (!messages) {
      res.status(404).json("Not found conversation");
      return;
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewMessage,
  getAllMessages,
};
