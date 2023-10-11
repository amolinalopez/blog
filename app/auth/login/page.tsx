"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const payload = {
        username,
        password,
      };

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Login successful! Token received: ", data.token);
        localStorage.setItem("token", data.token);
        router.push("/grimoire");
      } else {
        const data = await response.json();
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        New here ? click <Link href="/auth/signup">here</Link> to sign up
      </p>
    </div>
  );
};

export default LoginPage;
