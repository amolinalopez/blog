import styles from "@/app/styles/leftSidebar.module.css";
import logo_with_name from "@/public/logo_with_name.svg";
import Logo_BO_Icon from "@/public/Logo_BO_Icon.svg";
import icon_home from "@/public/icon_home.svg";
import icon_search from "@/public/icon_search.svg";
import icon_add from "@/public/icon_add.svg";
import icon_saved from "@/public/icon_saved.svg";
import icon_chat from "@/public/icon_chat.svg";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import LogoutBtn from "./LogoutBtn";

export default function LeftSidebar() {
  const { user } = useUser();

  return (
    <aside className={styles.sidebar}>
      <div>
        <Image
          src={logo_with_name}
          alt="Logo"
          width={150}
          height={100}
          className={styles.logo}
          priority
        />
      </div>
      <section id={styles.sidebarInside}>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Image
                src={icon_home}
                alt="Accueil"
                id={styles.iconSVG}
                width={30}
                height={30}
              />
              <Link href="/grimoire">Accueil</Link>
            </li>
            <li>
              <Link href="/#">
                <Image
                  src={icon_search}
                  alt="Recherche"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Recherche
              </Link>
            </li>
            <li>
              <Link href="/create_post">
                <Image
                  src={icon_add}
                  alt="Créer"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Créer
              </Link>
            </li>
            <li>
              <Link href="/#">
                <Image
                  src={icon_chat}
                  alt="Messages"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Messages
              </Link>
            </li>
            <li>
              <Link href="/#">
                <Image
                  src={icon_saved}
                  alt="Recherche"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Saved
              </Link>
            </li>
            <li>
              <Link href="/#">
                <Image
                  src={icon_search}
                  alt="Recherche"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Parametres
              </Link>
            </li>

            <li>
              <Link href="/profil/myProfil" className={styles.profile}>
                <Image
                  src={user?.profilePicture || Logo_BO_Icon}
                  alt="Mon profil"
                  width={40}
                  height={40}
                  className="profilePicture"
                  id={styles.iconSVG}
                  priority
                />
                <p> Mon profil</p>
              </Link>
            </li>
          </ul>
        </nav>
        <LogoutBtn />
      </section>
    </aside>
  );
}
