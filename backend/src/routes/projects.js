import { Router } from "express";
import { projects } from "../data/projects.js";

const router = Router();

// GET /api/projects?filter=AI&search=kitchen
router.get("/", (req, res) => {
  const { filter, search } = req.query;
  let result = [...projects];
  if (filter && filter !== "All") {
    result = result.filter((p) => p.filter.includes(filter));
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }
  res.json({ success: true, count: result.length, data: result });
});

router.get("/:id", (req, res) => {
  const proj = projects.find((p) => p.id === req.params.id);
  if (!proj) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, data: proj });
});

export default router;
