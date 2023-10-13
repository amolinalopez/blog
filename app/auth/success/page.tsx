"use client";
import Image from "next/image";
import bo_logo_icon from "../../../public/Logo_BO_Icon.svg";
import styles from "../../styles/signup.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutBtn from "../../../components/LogoutBtn";
import AuthLayout from "../layout";
import { amarante } from "../../../utils/fonts";
import Button from "../../../components/btn";
import Link from "next/link";

const SuccessSignUpPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    console.log("Raw Token:", token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded Payload:", payload);

    setUsername(payload.username);
  }, [router]);

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
      <h1 className={amarante.className} id={styles.successCongrats}>
        Bravo {username} ! <br /> Votre inscription a bien été prise en compte
      </h1>
      <p id={styles.welcomeMessage}>
        Nous sommes ravies de vous compter parmi nos utilisateurs. <br /> Nous
        espérons que votre expérience ici vous sera agréable et bénéfique.
      </p>
      <div className={styles.successBtnContainer}>
        <Link href="/grimoire">
          <Button text="Continue" />
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SuccessSignUpPage;
