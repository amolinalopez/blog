"use server";
import { decodeToken } from "@/utils/token";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie) {
    throw new Error("No token found 💔");
  }

  const token = tokenCookie.value;

  if (!token) {
    console.log("No token found -----🔥");
    return null;
  }

  const payload = decodeToken(token);
  if (!payload) {
    console.log("Failed to decode token");
    return null;
  }

  const expirationDate = new Date(payload.exp * 1000);
  if (expirationDate < new Date()) {
    console.log("Token has expired");
    return null;
  }

  try {
    const response = await fetch(`/api/users/${payload.id}`);
    console.log("API Response: ", response);
    if (!response.ok) {
      console.error("Failed to fetch user data:", response.statusText);
      return null;
    }
    const userData = await response.json();
    console.log("Received User Data: ", userData);
    const { stats } = userData;
    return { user: userData.user, stats };
  } catch (error) {
    console.log("Failed to fetch user data:", error);
    return null;
  }
}

export default getUser;
