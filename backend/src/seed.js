import mongoose from "mongoose";
import dotenv from "dotenv";
import Contact from "./models/Contact.js";
dotenv.config();

const run = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) return console.log("Set MONGO_URI to seed");
  await mongoose.connect(uri);
  console.log("Seeding demo contact...");
  await Contact.create({
    name: "Demo Visitor",
    email: "demo@example.com",
    subject: "Love your portfolio",
    message: "Great projects! Would love to connect about an internship.",
  });
  console.log("Seeded");
  await mongoose.disconnect();
};
run();
