export function validateUserData(data: any): string | null {
  if (!data.username || typeof data.username !== "string") {
    return "Username is required and should be a string.";
  }
  if (
    !data.email ||
    typeof data.email !== "string" ||
    !data.email.includes("@")
  ) {
    return "Email is required, should be a string and valid.";
  }
  if (
    !data.password ||
    typeof data.password !== "string" ||
    data.password.length < 8
  ) {
    return "Password is required, should be a string and at least 8 characters long.";
  }
  return null;
}
