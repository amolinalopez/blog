import "./styles/globals.css";
import type { Metadata } from "next";
import { Amarante, Jost } from "next/font/google";
import localFont from "next/font/local";

const lucioleRegular = localFont({ src: "../fonts/Luciole-Regular.ttf" });
const lucioleBold = localFont({ src: "../fonts/Luciole-Bold.ttf" });
const amarante = Amarante({ subsets: ["latin"], weight: "400" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });
const spellweaver = localFont({ src: "../fonts/Spellweaver_Nodes.otf" });

export const metadata: Metadata = {
  metadataBase: new URL("https://burnedones.vercel.app/"),
  title: "Burned Ones",
  description: "For all the burned witches out there",
  applicationName: "Burned Ones",
  keywords: ["burned", "ones", "feminism", "lgbtq", "queer", "minorities"],
  creator: "Adriana Molina Lopez",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  authors: [
    { name: "Adriana Molina Lopez", url: "https://github.com/amolinalopez" },
  ],
  generator: "Next.js",
  verification: {
    google: "aDASsejnfIdU5hynwGxEpXNHcJJl_8lxvRaTuYVq1cY",
  },
  themeColor: "#FFF9F2",
  colorScheme: "light",
  twitter: {
    site: "@burnedones",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="aDASsejnfIdU5hynwGxEpXNHcJJl_8lxvRaTuYVq1cY"
      />
      <body className={jost.className}>{children}</body>
    </html>
  );
}
