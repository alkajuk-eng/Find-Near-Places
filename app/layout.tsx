import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// Context providers
// They allow sharing data between components
import UserLocationProvider from "./context/UserLocationProvider";

import SelectedBusinessProvider from "./context/SelectedBusinessProvider";

import { FavoriteProvider } from "./context/FavoriteContext";

// Load main application font
const geistSans = Geist({
  variable: "--font-geist-sans",

  subsets: ["latin"],
});

// Load monospace font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",

  subsets: ["latin"],
});

// Website metadata shown by browser and search engines
export const metadata: Metadata = {
  title: "Find Near Place",

  description: "Find places near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full`}
      >
        {/*
          UserLocationProvider
          Stores user's GPS location
          Available in all child components
        */}

        <UserLocationProvider>
          {/*
            SelectedBusinessProvider
            Stores currently selected place
            Used by Map and PlaceInfoBox
          */}

          <SelectedBusinessProvider>
            {/*
              FavoriteProvider
              Stores user's favourite places
              Used by BusinessList and Favorites menu
            */}

            <FavoriteProvider>{children}</FavoriteProvider>
          </SelectedBusinessProvider>
        </UserLocationProvider>
      </body>
    </html>
  );
}
