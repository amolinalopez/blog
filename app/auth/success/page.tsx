"use client";
import Image from "next/image";
import bo_logo_icon from "../../../public/Logo_BO_Icon.svg";
import styles from "../../styles/signup.module.css";
import AuthLayout from "../layout";
import { amarante } from "../../../utils/fonts";
import Button from "../../../components/btn";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

const SuccessSignUpPage: React.FC = () => {
  const { user } = useUser();

  return (
    <AuthLayout>
      <div className={styles.centerLogo}>
        <Image
          src={bo_logo_icon}
          width={122}
          height={160}
          alt="icon logo of burned ones"
          priority
          id={styles.logoSuccess}
        />
      </div>
      <h1 className={amarante.className} id={styles.successCongrats}>
        Congratulations, {user?.username}! <br /> Your registration is complete
      </h1>
      <p id={styles.welcomeMessage}>
        We are delighted to have you join our community. <br /> We hope that
        your experience here will be enjoyable and beneficial.
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
