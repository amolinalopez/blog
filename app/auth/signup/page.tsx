"use client";

import { useState } from "react";
import Image from "next/image";
import bo_logo_icon from "../../../public/Logo_BO_Icon.svg";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    try {
      const payload = {
        username,
        password,
        email,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        console.log("Signup successful! allleeeeez 🔥");
      } else {
        const data = await response.json();
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <div>
      <Image
        src={bo_logo_icon}
        width={122}
        height={160}
        alt="Picture of the author"
        priority
      />
      <h1>Sign up here</h1>
      <p>
        Welcome to this sharing platorm. Burned Ones. To access the platform
        please fill in the following informations :
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
