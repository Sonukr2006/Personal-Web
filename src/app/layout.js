import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Splash from "./components/Splash";
import GlobalBackgroundCanvas from "../components/GlobalBackgroundCanvas";
import WalkingDog from "./components/pet/WalkingDog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SoNUU | Sonu Kumar",
  description: "Portfolio of Sonu Kumar, full-stack developer and CSE student.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalBackgroundCanvas />
        <Header />
        {children}
        <WalkingDog />
        <Splash />
      </body>
    </html>
  );
}