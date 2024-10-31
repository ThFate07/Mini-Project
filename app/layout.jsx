"use client";

import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
