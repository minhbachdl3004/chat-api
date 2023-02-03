const Conversation = require("../models/Conversation");

const createNewConversation = async (req, res) => {
  try {
    const newConversation = await new Conversation({
      users: [req.body.userA, req.body.userB],
    });

    //Save new conversation to DB
    const conversation = await newConversation.save();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewConversation,
  getAllConversation,
};
