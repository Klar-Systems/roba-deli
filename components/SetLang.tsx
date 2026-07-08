"use client";
import { useEffect } from "react";

// Root <html lang> lives in the root layout (en). On the /fi route this flips it to fi
// client-side — keeps English unprefixed at / without [locale] routing.
export default function SetLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);
  return null;
}
