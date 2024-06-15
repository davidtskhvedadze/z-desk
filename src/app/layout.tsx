"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar, NavLink } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { SignIn } from "@/components/SignIn";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SignOut } from "@/components/SignOut";
import { useEvents } from "@/context/eventsContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const HasTokenContext = createContext({
  hasToken: false,
  setHasToken: (hasToken: boolean) => {},
});

export const useHasToken = () => {
  return useContext(HasTokenContext);
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasToken, setHasToken] = useState(false);
  const events = useEvents();

  const session = async () => {
    try {
      const response = await fetch('/api/verify', {
        credentials: 'include', 
      });
      
      if(response.ok) {
        setHasToken(true);
      } else {
        setHasToken(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    session();
    events.on('sessionChanged', session);

    return () => {
      events.off('sessionChanged', session);
    };
  }, [events]);

  return (
    <HasTokenContext.Provider value={{ hasToken, setHasToken }}>
    <html lang="en">
      <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
        <NavBar>
          <div className={cn("flex justify-start ml-8")}>Z-Desk</div>
          <div className="flex justify-center flex-grow">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/tickets">Tickets</NavLink>
          </div>
          <div className={cn("flex justify-end mr-8")}>
            {hasToken ? <SignOut /> : <SignIn />}
          </div>
        </NavBar>
        <Toaster />
        {children}
      </body>
    </html>
    </HasTokenContext.Provider>
  );
}
