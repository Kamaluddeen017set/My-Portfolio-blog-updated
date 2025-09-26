"use client";

import { useEffect } from "react";

export default function LayoutClient() {
  useEffect(() => {
    const origError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("findDOMNode is deprecated")
      ) {
        return; // ignore this specific warning
      }
      origError(...args);
    };
  }, []);

  return null;
}
