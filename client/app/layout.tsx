import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import TranslationContextProvider from "@/contexts/translationContext";
import Footer from "@/components/Footer";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Notably",
  description: "Social Media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col `}>
        <TranslationContextProvider>
          <Header />

          <div className="px-4 flex-1">{children}</div>

          <Footer />
        </TranslationContextProvider>
      </body>
    </html>
  );
}
