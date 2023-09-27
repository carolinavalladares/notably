"use client";

import Header from "@/components/Header";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import TranslationContextProvider from "@/contexts/translationContext";
import Footer from "@/components/Footer";
import AuthContextProvider from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import MobileNav from "@/components/MobileNav";
import { useMediaQuery } from "react-responsive";
import { maxScreenWidth } from "@/CONSTS/mediaQuery";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Notably",
  description: "Social Media",
  icons: ["./favicon.ico"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery({ query: `(max-width: ${maxScreenWidth})` });

  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col `}>
        <AuthContextProvider>
          <TranslationContextProvider>
            <Header />

            <div className={`px-4 flex-1 max-w-4xl m-auto w-full `}>
              {children}

              {isMobile && (
                <div>
                  <MobileNav />
                </div>
              )}
            </div>

            <ToastContainer
              toastStyle={{
                backgroundColor: "var(--background-primary)",
                fontFamily: `${poppins.style.fontFamily}`,
                fontSize: "12px",
                color: `var(--text)`,
              }}
              closeButton={false}
              position="top-center"
            />

            <Footer isMobile={isMobile} />
          </TranslationContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
