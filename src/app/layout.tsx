import type { Metadata } from "next";
import "./globals.css";
import ClientNav from "./components/NavClient";
import { LoaderProvider } from "./contexts/LoaderContext";

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
        <LoaderProvider>
          <ClientNav>{children}</ClientNav>
        </LoaderProvider>
      </body>
    </html>
  );
}
