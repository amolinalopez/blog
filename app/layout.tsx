import "./styles/globals.css";
import type { Metadata } from "next";
import { Amarante, Jost } from "@next/font/google";
import localFont from "@next/font/local";

const lucioleRegular = localFont({ src: "../fonts/Luciole-Regular.ttf" });
const lucioleBold = localFont({ src: "../fonts/Luciole-Bold.ttf" });
const amarante = Amarante({ subsets: ["latin"], weight: "400" });
const jost = Jost({ subsets: ["latin"], weight: ["300","400"] });
const spellweaver = localFont({ src: "../fonts/Spellweaver_Nodes.otf" });

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
      <body className={jost.className}>{children}</body>
    </html>
  );
}
