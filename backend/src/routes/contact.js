import { Router } from "express";
import validator from "validator";
import Contact from "../models/Contact.js";

const router = Router();

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const errors = {};
  if (!name || !String(name).trim()) errors.name = "Name required";
  if (!email || !validator.isEmail(String(email))) errors.email = "Valid email required";
  if (!subject || !String(subject).trim()) errors.subject = "Subject required";
  if (!message || String(message).trim().length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  const payload = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    subject: String(subject).trim(),
    message: String(message).trim(),
    ip: req.ip,
  };

  // Try DB save, fallback to console log if DB not connected
  try {
    if (Contact.db.readyState === 1) {
      const doc = await Contact.create(payload);
      return res.status(201).json({ success: true, message: "Message received! I'll get back within 24h.", data: { id: doc._id } });
    }
    console.log("📩 Contact (no DB):", payload);
    return res.status(201).json({ success: true, message: "Message received! (DB not connected — logged to console)", data: payload });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to save message" });
  }
});

// GET /api/contact — admin list (protected via simple query token in demo)
router.get("/", async (req, res) => {
  if (req.query.token !== "admin-demo") {
    return res.status(401).json({ success: false, message: "Unauthorized — provide ?token=admin-demo" });
  }
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch {
    res.json({ success: true, count: 0, data: [], message: "DB not connected" });
  }
});

export default router;
