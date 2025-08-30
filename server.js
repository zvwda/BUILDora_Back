const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SendEmail = require("./utils/SendEmail.js");

require("dotenv").config();

const app = express();
import cors from "cors";
app.use(
  cors({
    origin: ["https://buildora-sepia.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/Email", SendEmail);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
