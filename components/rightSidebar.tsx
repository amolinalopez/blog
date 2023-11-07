import styles from "@/app/styles/rightSidebar.module.css";
import { amarante } from "@/utils/fonts";

export default function RightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <header className={amarante.className}>
        <h3>Vous aimeriez peut-être</h3>
      </header>
      <section className="trends">
        <h2>Tendances</h2>
        <div className="tags">
          <span className="tag">#picture</span>
          <span className="tag">#colors</span>
          <span className="tag">#aventure</span>
        </div>
        <button>Voir plus</button>
      </section>
      <section className="people">
        <h2>Personnes</h2>
        <div className="person">
          <div className="info">
            <p className="name">@DaisyBloom</p>
            <p className="follower">Suivie par @Noxyria</p>
          </div>
        </div>
        <div className="person">
          <div className="info">
            <p className="name">@MysticMoose</p>
            <p className="follower">Suivie par @Adri</p>
          </div>
        </div>
        <div className="person">
          <div className="info">
            <p className="name">@RapidRabbit</p>
            <p className="follower">Suivie par @Tessaurex</p>
          </div>
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
