import Link from "next/link";
import type { AdminIdentity } from "@/lib/admin-auth";
import styles from "@/app/admin/admin.module.css";

export function AdminHeader({
  identity,
  active = "articles",
}: {
  identity: AdminIdentity;
  active?: "articles" | "videos";
}) {
  const modeLabel =
    identity.mode === "development"
      ? "Local preview"
      : identity.mode === "password"
        ? "Password verified"
        : "Access verified";

  return (
    <header className={styles.adminHeader}>
      <Link className={styles.adminBrand} href="/admin">
        <b>JS</b>
        <span>
          <strong>JUNSU Editorial</strong>
          Content administration
        </span>
      </Link>
      <nav className={styles.adminNav} aria-label="Administration">
        <Link className={active === "articles" ? styles.adminNavActive : ""} href="/admin">
          Articles
        </Link>
        <Link className={active === "videos" ? styles.adminNavActive : ""} href="/admin/videos">
          Videos
        </Link>
      </nav>
      <div className={styles.adminUser}>
        <span className={styles.accessMode}>{modeLabel}</span>
        <span>{identity.email}</span>
        <Link href={active === "videos" ? "/videos" : "/blog"} target="_blank">
          View {active === "videos" ? "videos" : "blog"} →
        </Link>
        {identity.mode !== "development" ? (
          <form action="/api/admin/logout" method="post">
            <button type="submit">Sign out</button>
          </form>
        ) : null}
      </div>
    </header>
  );
}
