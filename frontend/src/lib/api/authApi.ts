import { API_BASE_URL } from "@/lib/config/config";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const logout = async () => {
  return await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const authApi = { login, signup, logout };

export default authApi;
