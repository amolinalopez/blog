import "./styles/globals.css";
import type { Metadata } from "next";
import { jost } from "@/utils/fonts";
import { UserProvider } from "../contexts/UserContext";
import Loading from "@/app/loading";
import { Suspense } from "react";

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
      <Suspense fallback={<Loading />}>
        <body className={jost.className}>
          <UserProvider>{children}</UserProvider>
        </body>
      </Suspense>
    </html>
  );
}
