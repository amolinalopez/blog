"use client";

import { useState } from "react";
import Image from "next/image";
import bo_logo_icon from "../../../public/Logo_BO_Icon.svg";
import corner_orange from "../../../public/Corner_Orange.svg";
import corner_orange_clair from "../../../public/corner_orange_clair.svg";
import plante from "../../../public/plante.svg";
import Link from "next/link";
import { amarante } from "../../../utils/fonts";
import styles from "../../styles/signup.module.css";
import Button from "../../../components/btn";

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
    <div className={styles.signup}>
      <Image
        src={corner_orange}
        width={250}
        height={220}
        alt="corner orange"
        priority
        className={styles.topLeft}
      />

      <Image
        src={corner_orange_clair}
        width={250}
        height={220}
        alt="corner orange clair"
        priority
        className={styles.bottomRight}
      />

      <Image
        src={plante}
        width={196}
        height={172}
        alt="plante"
        priority
        className={styles.topRight}
      />

      <Image
        src={plante}
        width={196}
        height={172}
        alt="plante"
        priority
        className={styles.bottomLeft}
      />

      <div className={styles.centerLogo}>
        <Image
          src={bo_logo_icon}
          width={122}
          height={160}
          alt="icon logo of burned ones"
          priority
        />
      </div>

      <h1 className={amarante.className}>Sign up</h1>
      <p id={styles.welcome}>
        Welcome to the Burned Ones experience sharing platform. To complete your
        registration, please fill out the fields below.
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
        <Button text="Sign Up" />
      </form>
      <p>
        Already have an account? click <Link href="/auth/login">here</Link> to
        log in
      </p>
    </div>
  );
};

export default SignupPage;
