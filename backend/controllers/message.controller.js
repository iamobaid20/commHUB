import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res)=>{
   try{
    const {message} = req.body;
    const {id: receiverId} = req.params; //jo parameter value aayi hai wo reciever id hai aur humne iss syntax se id ko rename karke receiverid kar diya
    const senderId = req.user._id // we will acces data base user because we have added the data base user in the protectRoute middleware last mein

    //finding if there is any convo between senderId and receiverId
    let conversation = await Conversation.findOne({
        participants : {$all : [senderId, receiverId]}, // we are not putting message becuase in the model we declare default value as [] empty array
    });

    //if there is no conversation then we will create one conversation
    if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }

    // if there is a message

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
        // await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE

    res.status(201).json(newMessage);

   }
   catch(error)
   {
    console.log("Error in sendMesage controller",error.message)
    res.status(500).json({error:"Internal server error"})
   }
}

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};