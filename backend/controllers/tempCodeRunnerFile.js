const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    res.status(201).json(newMessage);