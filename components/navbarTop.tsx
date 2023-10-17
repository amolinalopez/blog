import Image from "next/image";
import bo_logo_icon from "../public/Logo_BO_Icon.svg";
import icon_notif from "../public/icon_notification.svg";
import icon_hamburger_menu from "../public/icon_hamburger_menu.svg";
import styles from "../app/styles/navbar.module.css";
import LogoutBtn from "./LogoutBtn";

export default function NavbarTop() {
  return (
    <div className={styles.navbarTopWrapper}>
      <nav className={styles.container}>
        <a href="/grimoire" className={styles.logoContainer}>
          <Image
            src={bo_logo_icon}
            width={30}
            height={40}
            alt="icon logo of burned ones"
            priority
          />
        </a>
        <LogoutBtn />
        <div className={styles.iconsContainer}>
          <a href="/grimoire" className={styles.bellIcon}>
            <Image
              src={icon_notif}
              width={22}
              height={27}
              alt="icon notifications"
            />
          </a>

          <div className={styles.menuIcon}>
            <Image
              src={icon_hamburger_menu}
              width={22}
              height={27}
              alt="icon menu hamburger"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
