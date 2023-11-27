import React from "react";
import Link from "next/link";
import styles from "@/components/Footer/footer.module.css";

export default function Footer() {
  return (
    <div>
      <div className={styles.Footer}>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Meta
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            About
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Blog
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Jobs
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Help
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            API
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Privacy
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Terms
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Locations
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Instagram Lite
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Threads
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Contact Uploading & Non-Users
          </Link>
        </div>
        <div>
          <Link className={styles.footer_link} href="https://about.meta.com/">
            Meta Verified
          </Link>
        </div>
      </div>
      <div className={styles.last_row_footer}>
        <select className={styles.footer_options}>
          <option value="English">English</option>
          <option value="Afrikaans">Afrikaans</option>
          <option value="Dansk">Dansk</option>
        </select>
        <div className={styles.footer_link}>© 2023 Instagram from Meta</div>
      </div>
    </div>
  );
}
