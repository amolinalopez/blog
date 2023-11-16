"use client";
import { useState } from "react";
import Image from "next/image";
import bo_logo_icon from "../../../public/Logo_BO_Icon.svg";
import Link from "next/link";
import { amarante, jost } from "../../../utils/fonts";
import styles from "../../styles/signup.module.css";
import Button from "../../../components/btn";
import eye_open from "../../../public/eye_open.svg";
import eye_close from "../../../public/eye_close.svg";
import { useRouter } from "next/navigation";
import AuthLayout from "../layout";
import { useUser } from "@/contexts/UserContext";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleSignup = async () => {
    if (!username || !password || !email) {
      setValidationError("All fields must be filled in.");
      return;
    }
    try {
      const payload = {
        username,
        password,
        email,
      };

      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const data = await response.json();
        // console.log("Signup successful! Token received:", data.token);
        setUser(data.user);
        router.push("/auth/success");
      } else {
        const data = await response.json();
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <AuthLayout>
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
      <div className={styles.formContainer}>
        <p id={styles.welcome}>
          Welcome to the Burned Ones sharing platform. <br /> To register,
          please fill out the fields below.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div>
            <label htmlFor="username" id={styles.labelHidden}>
              Username
            </label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input + " " + jost.className}
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
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input + " " + jost.className}
            />
            <span onClick={handlePasswordToggle} id={styles.spanEye}>
              <Image
                src={showPassword ? eye_open : eye_close}
                alt="eye icon"
                width={20}
                height={20}
                id={styles.eyeIconInput}
                priority
              />
            </span>
          </div>
          <div>
            <label htmlFor="email" id={styles.labelHidden}>
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input + " " + jost.className}
            />
          </div>
          <div className={styles.errorAuth}>
            {validationError && (
              <div className={styles.errorMessage}>{validationError}</div>
            )}
          </div>
          <Button text="Sign Up" />
        </form>
        <p id={styles.newHere}>
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
