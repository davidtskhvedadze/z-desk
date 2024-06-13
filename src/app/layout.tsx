import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar, NavLink } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zealthy Help Desk",
  description: "Help Desk application for Zealthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
        <NavBar>
          <div className={cn("flex justify-start ml-8")}>Z-Desk</div>
          <div className="flex justify-center flex-grow">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/tickets">Tickets</NavLink>
          </div>
          <div className={cn("flex justify-end mr-8")}>
            <SignOut />
            {/* <SignIn /> */}
          </div>
        </NavBar>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
