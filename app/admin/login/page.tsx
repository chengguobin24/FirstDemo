import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminIdentity, isAdminPasswordConfigured } from "@/lib/admin-auth";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ error?: string | string[]; next?: string | string[] }>;
};

function safeNext(value: string | string[] | undefined): string {
  const next = Array.isArray(value) ? value[0] : value;
  return next?.startsWith("/admin") && !next.startsWith("/admin/login")
    ? next
    : "/admin";
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const identity = await getAdminIdentity(await headers());
  const params = await searchParams;
  const next = safeNext(params.next);
  if (identity) redirect(next);

  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <main className={`${styles.adminPage} ${styles.loginPage}`}>
      <form className={styles.loginCard} action="/api/admin/login" method="post">
        <span className={styles.loginEyebrow}>JUNSU Admin</span>
        <h1>Sign in to content workspace</h1>
        <p>Enter the administrator password to manage articles and videos.</p>
        {!isAdminPasswordConfigured() ? (
          <div className={styles.loginNotice}>
            ADMIN_PASSWORD is not configured yet.
          </div>
        ) : null}
        {error ? (
          <div className={styles.loginError}>Password is incorrect. Please try again.</div>
        ) : null}
        <input type="hidden" name="next" value={next} />
        <label htmlFor="admin-password">Administrator password</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
        />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
