import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is where your main content would go.</p>
      <Link href="/auth/login">Go to Login</Link>
    </div>
  );
}
