import "./globals.css";
import type { Metadata } from "next";
import { Amarante } from "@next/font/google";
import localFont from "@next/font/local";

const lucioleRegular = localFont({ src: "../fonts/Luciole-Regular.ttf" });
const lucioleBold = localFont({ src: "../fonts/Luciole-Bold.ttf" });
const amarante = Amarante({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Burned Ones",
  description: "For all the burned witches out there",
  applicationName: "Burned Ones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lucioleRegular.className}>{children}</body>
    </html>
  );
}
