import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import bo_logo from "./../public/Logo_BO.svg";
import Button from "@/components/btn";

export default function Home() {
  return (
    <main>
      <div className={styles.homePage}>
        <Image
          src={bo_logo}
          alt="Burned Ones Logo"
          width={500}
          height={500}
          priority
        />
        <p>
          Welcome to Burned Ones, a social media platform designed specifically
          for minorities.
          <br />
          Our platform is a space where users can share valuable resources, tell
          their stories, and connect with others who have felt marginalized. Our
          platform was inspired by the personal experiences of our founder, a
          mixed-race Latina/white woman, and the stories of her peers. We
          believe in the strength of shared narratives and the comfort of
          collective wisdom. Our community is for minorities, women, and
          LGBTQIA+ individuals who have felt marginalized and are seeking both a
          voice and an ear. We offer customizable user profiles, diverse content
          sharing, and engagement tools such as liking, commenting, and
          following other users. While our platform is currently open to all
          users, we plan to move towards an invite-only model in the future for
          the safety and exclusivity of our users.
          <br />
          Thank you for considering Burned Ones as your social media platform.
          We hope to provide a safe and inclusive space for all users.
        </p>
        <Link href="/auth/login">
          <Button text="Enter" />
        </Link>
      </div>
    </main>
  );
}
