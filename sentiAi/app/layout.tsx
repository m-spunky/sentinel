import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SentinelAI Fusion | Intelligence Platform",
  description: "Unified Cyber Threat Intelligence Platform. Detect, analyze, and respond to threats using multi-modal AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen w-full bg-black text-[#E0E1DD] selection:bg-accent/30 selection:text-accent font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
