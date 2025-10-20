require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const chatbotRoutes = require("./routes/chatbot");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: [SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use("/chatbot", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
