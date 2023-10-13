"use client";
import { ReactNode } from "react";

interface FeedLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<FeedLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
