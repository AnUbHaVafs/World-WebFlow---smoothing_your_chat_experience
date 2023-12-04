const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db.js");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const newUserRoutes = require("./routes/newUserRoutes");
const setFlowRoutes = require("./routes/setFlowRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
const path = require("path");
// const { setFlowMessages } = require("./helpers/setFlowMessages.js");
const SetFlowModal = require("./models/setFlowModal.js");
const Chat = require("./models/chatModel.js");
const Message = require("./models/messageModel.js");
const User = require("./models/userModel.js");
// const Message = require("../models/messageModel");
// const Chat = require("../models/chatModel");
const app = express();

app.use(cors());
app.use(express.json()); // to accept JSON data

dotenv.config();
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/newuser", newUserRoutes);
app.use("/api/flow", setFlowRoutes);

// --------------------------cron jon (toad scheduler)------------------------------
const setFlowMessages = async () => {
  try {
    const userSetFlows = await SetFlowModal.find({});
    const currentDateAndTime = new Date().toISOString();
    userSetFlows.map((userSetFlow, i) => {
      const date1 = new Date(currentDateAndTime);
      const date2 = new Date(userSetFlow.flowTime);
      const timeDifferenceInMilliseconds = Math.abs(date2 - date1);
      const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
      if (timeDifferenceInSeconds < 20) {
        userSetFlow.receivers.map(async (receiverId, index) => {
          const allBothUserMessages = await Chat.find({ isGroupChat: false });
          allBothUserMessages.map((chat) => {
            if (!Boolean(chat.users) || !Boolean(chat.users.length)) return;
            const user1 = chat.users[0];
            const user2 = chat.users[1];
            const hasReceiver = chat.users.includes(receiverId);
            const hasSender = chat.users.includes(userSetFlow.sender);
            const hasBoth = hasReceiver && hasSender;
            if (hasBoth) {
              const newMessage = {
                sender: userSetFlow.sender,
                content: userSetFlow.message,
                chat: chat,
              };
              // console.log(receiverId);
              let receiverObj;
              User.findById(receiverId).then((user) => {
                receiverObj = user;
                // console.log("user-->", user);
              });
              // console.log("receiverObj-->", receiverObj);
              Message.create(newMessage).then((res) => {
                console.log("-->", receiverObj);
                io.emit("flowMessage", res, receiverObj);
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const scheduler = new ToadScheduler();
const task = new Task("simple task", () => {
  setFlowMessages();
});
const job = new SimpleIntervalJob({ seconds: 20 }, task);

scheduler.addSimpleIntervalJob(job);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "Frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
