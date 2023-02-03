const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")

dotenv.config()
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewurlParser: true }, () => {
    console.log("Connected to Mongodb");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());


//ROUTES
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)



app.listen(3000, () => {
  console.log(`Server is running`);
});
