"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { AlertProvider } from "@/components/AlertContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AlertProvider>{children}</AlertProvider>
    </ThemeProvider>
  );
}
