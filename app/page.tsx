import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome to the Home Page!</h1>
        <p>This is where your main content would go.</p>
        <Link href="/auth/login">Go to Login</Link>
      </div>
    </main>
  );
}
