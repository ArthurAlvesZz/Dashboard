import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/contexts/StoreContext";
import { ToastProvider } from "@/components/ui/Toast";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Santa Bronx Ops — Dashboard Financeiro",
  description: "Gestão financeira e operacional das filiais Santa Bronx",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} font-sans`}>
        <StoreProvider>
          <ToastProvider>
            {children}
            <Toaster theme="dark" position="bottom-right" />
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
