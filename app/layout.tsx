import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import BackGround from "@/components/BackGround";
import ModalProvider from "@/components/providers/model-provider";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LiQiang's Blog",
  description: "Made by LQ with love 🐣",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-white dark:bg-[#313338] w-full h-full flex items-center relative justify-center"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="blog-theme"
        >
          <ModalProvider />
          <Navbar />
          <BackGround />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
