"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar, NavLink } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { SignIn } from "@/components/SignIn";
import React, { useState, useEffect } from 'react';
import { SignOut } from "@/components/SignOut";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await fetch('/api/getSession');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error('Failed to get session:', error);
      }
    };
  
    getSession();
  }, [token]);

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
          {token && (
            <SignOut />
          )}
          {!token && (
            <SignIn />
          )}
          </div>
        </NavBar>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
