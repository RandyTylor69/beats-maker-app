import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Beat } from "./models/Beat.js";

const app = express();
const PORT = 3001;

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://beats-maker-app.vercel.app/"],
  })
);
app.use(express.json());
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.post("/archive", async (req, res) => {
  try {
    const { soundChoices, padsData, name } = req.body;
    const beatDoc = await Beat.create({ soundChoices, padsData, name });
    res.json({ message: "Successful save", beatDoc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/archive", async (req, res) => {
  try {
    const beats = await Beat.find();
    res.json({ beats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
