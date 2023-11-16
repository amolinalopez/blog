"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Post, User, UserStats } from "@/types/userTypes";

interface UserContextProps {
  user: User | null;
  stats: UserStats | null;
  posts: Post[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setStats: React.Dispatch<React.SetStateAction<UserStats | null>>;
  updateStats: (newStats: UserStats) => void;
  fetchUserData: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const updateStats = (newStats: UserStats) => {
    setStats(newStats);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/users/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        setStats(userData.stats);
        setPosts(userData.user.posts || []);
      } else if (response.status === 401) {
        //  when user not loggeed in
        console.log("User is not logged in.");
        setUser(null);
        setStats(null);
        setPosts([]);
      } else {
        console.error("An error occurred while fetching user data.");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        stats,
        setUser,
        setStats,
        updateStats,
        posts,
        fetchUserData,
      }}
    >
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
