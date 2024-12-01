import type { Metadata } from "next";
import "./globals.css";
import ClientNav from "../components/NavClient";

export const metadata: Metadata = {
  title: "Memorylog",
  description: "A project by Vinícius Miazaki de Moraes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientNav>{children}</ClientNav>
      </body>
    </html>
  );
}
