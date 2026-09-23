export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Server error", error: err.message });
};

export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};
