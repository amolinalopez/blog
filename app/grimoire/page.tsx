"use client";

import { useState, useEffect } from "react";
import LogoutBtn from "../../components/LogoutBtn";
import { useRouter } from "next/navigation";

const GrimoirePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
       router.push("/auth/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.username);
  }, [router]);

  return (
    <div>
      <h1>Grimoire</h1>
      <h2>Hello, {username}</h2>
      <LogoutBtn />
    </div>
  );
};

export default GrimoirePage;
