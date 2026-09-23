import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 3500,
  headers: { "Content-Type": "application/json" },
});

// Typed helpers
export const fetchProjects = async (filter?: string) => {
  const params: Record<string, string> = {};
  if (filter && filter !== "All") params.filter = filter;
  const { data } = await api.get("/api/projects", { params });
  return data?.data ?? data;
};

export const fetchProject = async (id: string) => {
  const { data } = await api.get(`/api/projects/${id}`);
  return data?.data ?? data;
};

export const fetchSkills = async () => {
  const { data } = await api.get("/api/skills");
  return data?.data ?? data;
};

export const fetchGithubRepos = async (username = "octocat", per_page = 6) => {
  const { data } = await api.get("/api/github/repos", { params: { username, per_page } });
  return data?.data ?? [];
};

export const submitContact = async (payload: { name: string; email: string; subject: string; message: string }) => {
  const { data } = await api.post("/api/contact", payload);
  return data;
};

export const checkHealth = async () => {
  const { data } = await api.get("/api/health");
  return data;
};
