import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import bo_logo from "./../public/Logo_BO.svg";
import Button from "@/components/btn";
import adHomePic from "@/public/adHomePic.svg";
import plante from "@/public/plante.svg";
import { caveat } from "@/utils/fonts";

export default function Home() {
  return (
    <>
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

      <main className={styles.homePage}>
        <section className={styles.imageAd}>
          <Image
            src={adHomePic}
            width={500}
            // height={500}
            alt="picture advertisement for burned ones app"
            className={styles.adHomePic}
            priority
          />
        </section>

        <section className={styles.textContent}>
          <Image
            src={bo_logo}
            alt="Burned Ones Logo"
            className={styles.homeImage}
            priority
          />
          <p className={styles.homeText}>
            Welcome to Burned Ones: Where Echoes of the Past Ignite Our Future
            Burned Ones isn&apos;t just a platform; it&apos;s a proclamation.
            <br />
            Here, we stand as the proud descendants of the silenced, the
            marginalized, the &apos;witches&apos; they couldn&apos;t burn. Our
            community is a sanctuary for minorities, women, and LGBTQIA+
            individuals—voices seeking to rewrite their narratives in flames of
            empowerment.
            <br /> <br /> Connect, share, and fuel the collective wisdom that
            rises from our shared histories. <br /> As our circle tightens,
            we&apos;re transitioning to an invite-only haven, crafting a secure
            and sacred space for every kindred spirit.
            <br /> <br />
            Embrace Burned Ones, and let&apos;s set the world ablaze with the
            stories they once tried to extinguish.
          </p>
          <aside className={caveat.className}>- Burned Ones Team</aside>
          <div id={styles.btnEnter}>
            <Link href="/auth/login">
              <Button text="Enter" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
