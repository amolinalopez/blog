"use client"
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const LogoutBtn: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (response.status === 200) {
        console.log("Successfully logged out");
        localStorage.removeItem("token");
        router.push("/auth/login");
        setUser(null);
      } else {
        const data = await response.json();
        console.error("Logout failed:", data);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutBtn;
