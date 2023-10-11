"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import bo_logo from "../../../public/Logo_BO.svg";
import corner_orange from "../../../public/Corner_Orange.svg";
import corner_orange_clair from "../../../public/corner_orange_clair.svg";
import plante from "../../../public/plante.svg";
import styles from "../../styles/signup.module.css";
import { amarante } from "../../../utils/fonts";
import eye_open from "../../../public/eye_open.svg";
import eye_close from "../../../public/eye_close.svg";
import Button from "../../../components/btn";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
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

      <h1 className={amarante.className} id={styles.welcomeLogin}>
        Welcome to
      </h1>

      <div className={styles.Logo}>
        <Image
          src={bo_logo}
          width={210}
          height={198}
          alt="icon logo of burned ones"
          priority
        />
      </div>
      <div className={styles.formContainer}>
        {" "}
        {/* new className to center form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label id={styles.labelHidden} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Identifiant"
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label id={styles.labelHidden} htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              //  ${!showPassword ? spellweaver.className : ""}`}
            />
            <span onClick={handlePasswordToggle} id={styles.spanEye}>
              <Image
                src={showPassword ? eye_open : eye_close}
                alt="eye icon"
                width={20}
                height={20}
                id={styles.eyeIconInput}
              />
            </span>
          </div>
          <a href="#" id={styles.lienMdpForgotten}>Mot de passe oublié ?</a>
          <div className={styles.buttonContainer}>
            <Button text="Log In" />
          </div>
        </form>
        <p>
          New here ? click <Link href="/auth/signup">here</Link> to sign up
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
