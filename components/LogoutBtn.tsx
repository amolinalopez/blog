import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookies";

const LogoutBtn: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      console.log("Attempting logout...");
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (response.status === 200) {
        console.log("Successfully logged out");
        removeCookie("token");
        setUser(null);
        router.push("/auth/login");
      } else {
        const data = await response.json();
        console.error("Logout failed:", data);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn">
      Logout
    </button>
  );
};

export default LogoutBtn;
