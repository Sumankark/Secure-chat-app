import { Chat, User } from "../schema/model.js";

export const accessChat = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await chatData
        .findOne({ _id: createdChat.Id })
        .populate("users", "-password");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400).json({
        message: new Error(error.message),
      });
    }
  }
};

export const fetchChats = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).json({
          success: true,
          data: results,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: new Error(error.message),
    });
  }
};

export const createGroupChat = async (req, res, next) => {
  try {
    console.log("Received Request Body:", req.body);

    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    // Use req.body.users directly if it's an array of user IDs
    var users = req.body.users;

    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    // If you want to convert user IDs to ObjectId, you can do it like this
    // users = users.map(userId => mongoose.Types.ObjectId(userId));

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    console.log("Created Group Chat:", fullGroupChat);
    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error in createGroupChat:", error);
    res.status(400).json({
      message: new Error(error.message),
    });
  }
};

export const renameGroup = async (req, res, next) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status.json({
      message: new Error("Chat Not Found"),
    });
  } else {
    res.json(updatedChat);
  }
};

export const removeFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404).json({
      message: new Error("Chat Not Found"),
    });
  } else {
    res.json(removed);
  }
}; 

export const addToGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400).json({
      message: new Error("Chat Not Found"),
    });
  } else {
    res.json(added);
  }
};
