import type { Metadata } from "next";

import LegalDoc from "@/components/LegalDoc";
import { LEGAL } from "@/lib/legal";

const doc = LEGAL.fi.privacy;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.intro,
  alternates: { canonical: "/fi/tietosuoja" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalDoc doc={doc} locale="fi" />;
}
