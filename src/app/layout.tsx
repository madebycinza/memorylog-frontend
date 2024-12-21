import type { Metadata } from "next";
import { LoaderContext } from "@/app/utils/LoaderContext";
import LayoutWrap from "@/app/components/LayoutWrap";
import "@/app/globals.css";

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
        <LoaderContext>
          <LayoutWrap>
            {children}
          </LayoutWrap>
        </LoaderContext>
      </body>
    </html>
  );
}
