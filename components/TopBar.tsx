import { dict, type Locale } from "@/lib/i18n";

export default function TopBar({ locale }: { locale: Locale }) {
  const t = dict[locale].topbar;
  return (
    <div className="topbar">
      <div className="wrap">
        <span>{t.addr}</span>
        <span className="hide-s">
          {t.openPre} <b>{t.openBold}</b>
        </span>
        <a href="tel:+358503797490">{t.call}</a>
      </div>
    </div>
  );
}
