import { API_BASE_URL } from "@/config/config";

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

const authApi = { login, signup };

export default authApi;
