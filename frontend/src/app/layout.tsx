import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientSessionProvider from "../providers/ClientSessionProvider";
import CustomLayout from "./CustomLayout";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import SetTokenToLocalStorage from "../providers/SetTokenToLocalStorage";
import ReactQueryClientProvider from "../providers/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Twitter clone for learning purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <ReactQueryClientProvider>
          <ClientSessionProvider>
            <CustomLayout>{children}</CustomLayout>
            <Toaster />
            <SetTokenToLocalStorage />
          </ClientSessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
