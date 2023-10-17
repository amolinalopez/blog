"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { decodeToken } from "../utils/token";
import { getCookie } from "../utils/cookies";

interface User {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("User state has changed ✨:", user);
  }, [user]);

  const handleStorageChange = async () => {
    console.log("Storage event triggered");
    const token = getCookie("token");
    if (!token) {
      console.error("No token found -----😭");
      return;
    }

    const payload = decodeToken(token);
    if (!payload) {
      console.error("Failed to decode token");
      return;
    }

    const expirationDate = new Date(payload.exp * 1000);
    if (expirationDate < new Date()) {
      console.error("Token has expired");
      return;
    }

    try {
      const response = await fetch(`/api/users/${payload.id}`);
      console.log("API Response: ", response);
      if (!response.ok) {
        console.error("Failed to fetch user data:", response.statusText);
        return;
      }
      const userData = await response.json();
      console.log("Received User Data: ", userData);
      setUser(userData);
      console.log("Setting user:", userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    handleStorageChange();

    // Add event listener for future storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
