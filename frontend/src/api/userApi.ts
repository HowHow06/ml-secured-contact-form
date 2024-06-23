import { API_BASE_URL } from "@/config/config";

const getProfileFromToken = async () => {
  return await fetch(`${API_BASE_URL}/user/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const userApi = { getProfileFromToken };

export default userApi;
