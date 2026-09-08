import type { Metadata } from "next";

import LegalDoc from "@/components/LegalDoc";
import { LEGAL } from "@/lib/legal";

const doc = LEGAL.en.cookies;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.intro,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalDoc doc={doc} locale="en" />;
}
