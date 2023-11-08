import "./styles/globals.css";
import type { Metadata } from "next";

import { jost } from "@/utils/fonts";
import { UserProvider } from "../contexts/UserContext";
import LoadingPage from "./loading";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://burnedones.vercel.app/"),
  title: "Burned Ones",
  description: "For all the burned witches out there",
  applicationName: "Burned Ones",
  keywords: ["burned", "ones", "feminism", "lgbtq", "queer", "minorities"],
  creator: "Adriana Molina Lopez",
  icons: {
    icon: "/favicon.svg",
  },
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
      <Suspense fallback={<LoadingPage />}>
        <body className={jost.className}>
          <UserProvider>{children}</UserProvider>
        </body>
      </Suspense>
    </html>
  );
}
