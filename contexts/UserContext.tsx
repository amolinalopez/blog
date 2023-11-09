"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
  stats?: UserStats;
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
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/me");
        if (!response.ok) {
          console.error("Failed to fetch user data:", response.statusText);
          return;
        }
        const responseBody = await response.json();
        setUser({ ...responseBody.user, stats: responseBody.stats });
      } catch (error: unknown) {
        console.error((error as Error).message);
      }
    };

    fetchUser();
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
