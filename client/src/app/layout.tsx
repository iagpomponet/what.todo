import type { Metadata } from "next";
import "../global.css";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Theme
            appearance="light"
            accentColor="tomato"
            grayColor="gray"
            panelBackground="solid"
          >
            {children}
          </Theme>
        </ReactQueryProvider>
      </body>
    </html>
  );
}