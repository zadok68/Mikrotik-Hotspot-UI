import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/components/UserProvider";
import ConfigProvider from "@/components/ConfigProvider";
import Head from "next/head";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeiteck Wifi",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script src="/config.js" async/>
      </Head>
      <body className={`${/*inter.className*/""} relative`} >
        <ConfigProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
