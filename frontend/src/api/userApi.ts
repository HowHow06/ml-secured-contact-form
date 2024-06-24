import { API_BASE_URL } from "@/config/config";

const getProfileFromToken = async () => {
  return await fetch(`${API_BASE_URL}/user/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const submitContactForm = async ({
  fullname,
  dob,
  nric,
}: {
  fullname: string;
  dob: string;
  nric: string;
}) => {
  return await fetch(`${API_BASE_URL}/user/contact-form`, {
    method: "POST",
    body: JSON.stringify({
      fullname,
      dob,
      nric,
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const userApi = { getProfileFromToken, submitContactForm };

export default userApi;
