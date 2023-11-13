import styles from "@/app/styles/rightSidebar.module.css";
import { amarante, tulpenOne } from "@/utils/fonts";
import Image from "next/image";

export default function RightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <header className={amarante.className}>
        <h3>Vous aimeriez peut-être</h3>
        <hr />
      </header>
      <section>
        <h3>Tendances</h3>
        <div className={styles.tags}>
          <span className={styles.tag}>#Manif</span>
          <span className={styles.tag}> #obgyn</span>
          <span className={styles.tag}> #festival</span>
        </div>
      </section>
      <section>
        <h3>Personnes</h3>
        <div className={styles.userWrapper}>
          <Image
            src="https://res.cloudinary.com/dsbxyd6o2/image/upload/v1699437527/burnedOnes/jimmy-fermin-bqe0J0b26RQ-unsplash_nii2wo.jpg"
            alt="Recommanded user's profile picture"
            width={44}
            height={44}
            className={styles.profilePicture}
            priority
          />
          <p id={styles.username} className={tulpenOne.className}>
            @Citlali_M
          </p>
        </div>
        <div className={styles.userWrapper}>
          <Image
            src="https://res.cloudinary.com/dsbxyd6o2/image/upload/v1699437526/burnedOnes/prince-akachi-J1OScm_uHUQ-unsplash_nraa9x.jpg"
            alt="Recommended user's profile picture"
            width={44}
            height={44}
            className={styles.profilePicture}
            priority
          />
          <p id={styles.username} className={tulpenOne.className}>
            @Alissia
          </p>
        </div>
        <div className={styles.userWrapper}>
          <Image
            src="https://res.cloudinary.com/dsbxyd6o2/image/upload/v1699437526/burnedOnes/damon-zaidmus-7ncPcGL60-s-unsplash_wj0abp.jpg"
            alt="Recommanded user's profile picture"
            width={44}
            height={44}
            className={styles.profilePicture}
            priority
          />
          <p id={styles.username} className={tulpenOne.className}>
            @Chloe
          </p>
        </div>
        <div className={styles.userWrapper}>
          <Image
            src="https://res.cloudinary.com/dsbxyd6o2/image/upload/v1699437526/burnedOnes/joseph-gonzalez-iFgRcqHznqg-unsplash_hd6lyq.jpg"
            alt="Recommanded user's profile picture"
            width={44}
            height={44}
            className={styles.profilePicture}
            priority
          />
          <p id={styles.username} className={tulpenOne.className}>
            @Sergio
          </p>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>
          Confidentialité · Règles de communauté · Mentions légales · Sécurité ·
          Cookies · Burned Ones © 2023
        </p>
      </footer>
    </div>
  );
}
