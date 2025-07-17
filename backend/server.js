import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = 3001;

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000/"],
  })
);
app.use(express.json());
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.post("/save", (req, res) => {
  try {
    const { soundChoices, padsData } = req.body;
    res.json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
