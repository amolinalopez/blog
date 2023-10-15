"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { decodeToken } from "../utils/token";

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

// const defaultContextValue: UserContextProps = {
//   user: null,
//   setUser: () => {},
// };

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const payload = decodeToken(token);
    if (!payload) {
      console.error("Failed to decode token");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${payload.id}`);
        if (!response.ok) {
          console.error("Failed to fetch user data:", response.statusText);
          return;
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
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
