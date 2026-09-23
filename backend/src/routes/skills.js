import { Router } from "express";
import { skillGroups, currentlyLearning } from "../data/skills.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ success: true, data: { skillGroups, currentlyLearning } });
});

router.get("/groups", (_req, res) => {
  res.json({ success: true, data: skillGroups });
});

router.get("/learning", (_req, res) => {
  res.json({ success: true, data: currentlyLearning });
});

export default router;
