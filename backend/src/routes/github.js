import { Router } from "express";
import axios from "axios";

const router = Router();

// GET /api/github/repos?username=octocat&per_page=6
router.get("/repos", async (req, res) => {
  const username = req.query.username || "octocat";
  const per_page = req.query.per_page || 6;
  const sort = req.query.sort || "updated";
  try {
    const headers = { "User-Agent": "portfolio-backend" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const { data } = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: { per_page, sort },
      headers,
      timeout: 7000,
    });
    res.json({ success: true, data });
  } catch (err) {
    const status = err.response?.status || 500;
    res.status(status).json({ success: false, message: "GitHub fetch failed", error: err.message, data: [] });
  }
});

// GET /api/github/profile?username=octocat
router.get("/profile", async (req, res) => {
  const username = req.query.username || "octocat";
  try {
    const headers = { "User-Agent": "portfolio-backend" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const { data } = await axios.get(`https://api.github.com/users/${username}`, { headers, timeout: 7000 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "GitHub profile fetch failed", error: err.message });
  }
});

export default router;
