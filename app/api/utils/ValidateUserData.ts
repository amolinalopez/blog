import { UserData } from "../../../types/userTypes";

export function validateUserData(data: UserData): string | null {
  if (!isValidString(data.username)) {
    return "Username is required and should be a string.";
  }
  if (!isValidEmail(data.email)) {
    return "Email is required and should be a valid format.";
  }
  if (!isValidPassword(data.password)) {
    return "Password is required, should be a string and at least 8 characters long.";
  }
  return null;
}

function isValidString(value?: string): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(email?: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return isValidString(email) && emailRegex.test(email!);
}

function isValidPassword(password?: string): boolean {
  return isValidString(password) && password!.length >= 8;
}
