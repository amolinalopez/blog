// app/auth/layout.tsx
"use client";
import { ReactNode } from "react";
import Image from "next/image";
import corner_orange from "./../../public/corner_orange.svg";
import corner_orange_clair from "./../../public/corner_orange_clair.svg";
import plante from "./../../public/plante.svg";
import styles from "./../styles/signup.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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
      {children}
    </div>
  );
};

export default AuthLayout;
