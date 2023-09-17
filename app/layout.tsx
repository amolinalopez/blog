import "./globals.css";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
