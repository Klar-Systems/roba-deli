import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";
import SetLang from "@/components/SetLang";

export const metadata: Metadata = {
  title:
    "Roba Deli | Käsintehdyt voileivät, wrapit & smoothiet · Iso Roobertinkatu 1, Helsinki",
  description:
    "Roba Deli, Helsingin uusin voileipädeli Iso Roobertinkadulla. Käsintehtyjä New York -tyylisiä voileipiä, wrapeja, smoothieita & herkkuja. Kuumaa, tuoretta, juustoista, lounaasta myöhään iltaan.",
  alternates: {
    canonical: "/fi",
    languages: { en: "/", fi: "/fi" },
  },
  openGraph: {
    locale: "fi_FI",
    title: "Roba Deli · Helsingin uusin voileipädeli",
    description:
      "Käsintehdyt voileivät, wrapit & smoothiet, lounaasta myöhään iltaan. Iso Roobertinkatu 1, Helsinki.",
  },
};

export default function HomeFi() {
  return (
    <>
      <SetLang lang="fi" />
      <SiteContent locale="fi" />
    </>
  );
}
