"use client";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import bo_logo from "../../../public/Logo_BO.svg";
import styles from "../../styles/signup.module.css";
import { amarante } from "../../../utils/fonts";
import eye_open from "../../../public/eye_open.svg";
import eye_close from "../../../public/eye_close.svg";
import Button from "../../../components/btn";
import AuthLayout from "../layout";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setUser } = useUser();

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
        // console.log("the daataa", data);
        // console.log("Received user data: ", data.user);
        console.log("Login successful! Token received: ", data.token);
        setUser(data.user);
        router.push("/grimoire");
      } else {
        const data = await response.json();
        console.error("Login failed:", data);
        setLoginError("Wrong username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Something went wrong");
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
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
              autoComplete="username"
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
              autoComplete="current-password"
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

          <div className={styles.containerLienMdpForgotten}>
            <a href="#" id={styles.lienMdpForgotten}>
              Forgot password ?
            </a>
          </div>
          <div className={styles.errorAuth}>
            {loginError && (
              <div className={styles.errorMessage}>{loginError}</div>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <Button text="Log In" />
          </div>
        </form>
        <p id={styles.newHere}>
          New here ? <Link href="/auth/signup">Sign up</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
