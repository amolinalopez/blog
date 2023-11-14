import { useUser } from "@/contexts/UserContext";
import { getCookie, removeCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setUser } = useUser();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    console.log("Delete account initiated...");

    const token = getCookie("token");

    const response = await fetch("/api/users/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log("Account deleted successfully");
      removeCookie("token");
      setUser(null);
      router.push("/auth/login");
    } else {
      console.error("Failed to delete the account:", response.statusText);
      const errorData = await response.json();
      console.error(errorData.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <p>
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <button onClick={handleDeleteAccount}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ConfirmDeleteModal;
