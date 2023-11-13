import styles from "@/app/styles/comingSoon.module.css";
import Image from "next/image";
import ComingSoonImage from "@/public/coming_soon.svg";
import arrowLeftIcon from "@/public/arrow_left.svg";
import { amarante } from "@/utils/fonts";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer}>
        <Link href="/grimoire" className={styles.backButton}>
          <Image
            src={arrowLeftIcon}
            alt="Back"
            width={30}
            height={30}
            className={styles.arrowIcon}
          />{" "}
          Go Back to Homepage
        </Link>
      </div>
      <h1 className={amarante.className} id={styles.titlePageComingSoon}>
        Page Under Construction
      </h1>
      <Image
        src={ComingSoonImage}
        width={300}
        height={300}
        alt="coming soon"
        className={styles.comingSoonImage}
        priority
      />
    </div>
  );
};

export default ComingSoon;
