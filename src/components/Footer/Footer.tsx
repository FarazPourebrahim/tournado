import { ReactElement } from "react";

import Link from "next/link";

import MingcuteLinkedinFill from "@/icons/MingcuteLinkedinFill";
import MingcuteTelegramFill from "@/icons/MingcuteTelegramFill";
import MingcuteYoutubeFill from "@/icons/MingcuteYoutubeFill";

import styles from "./footer.module.css";

export default function FooterComponent(): ReactElement {
  const socialLinks = [
    { href: "#", icon: <MingcuteTelegramFill />, name: "Telegram" },
    { href: "#", icon: <MingcuteLinkedinFill />, name: "LinkedIn" },
    { href: "#", icon: <MingcuteYoutubeFill />, name: "YouTube" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.writings}>
        <div className={styles.logo}>تورنیدو</div>
        <p className={styles.description}>
          تجربه مسافرت به آسان ترین و لذت بخش ترین راه ممکن
        </p>
      </div>
      <div className={styles.visuals}>
        <ul className={styles.socials}>
          {socialLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} target="_blank" aria-label={link.name}>
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.copy}>
        تمامی حقوق مادی و معنوی این وب‌سایت، خدمات و محتوای مربوط به آن متعلق به
        من می‌باشد!
      </p>
    </footer>
  );
}
