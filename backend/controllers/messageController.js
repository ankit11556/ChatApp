const ConversationModel = require("../models/conversationModel");
const MessageModel = require("../models/messageModel");


exports.sendMessage = async (req,res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const {message} = req.body;

    let gotConversation = await ConversationModel.findOne({
      participants: {$all: [senderId, receiverId]}
    });

    if (!gotConversation) {
      gotConversation = await ConversationModel.create({
        participants: [senderId, receiverId]
      })
    };

    const newMessage = await MessageModel.create({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id)
    };

    await gotConversation.save();

    //socket io
  } catch (error) {
    console.log(error);
  }
}