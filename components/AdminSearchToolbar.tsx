import Link from "next/link";
import styles from "@/app/admin/admin.module.css";

export function AdminSearchToolbar({
  action,
  query,
  newHref,
  newLabel,
  placeholder,
}: {
  action: string;
  query: string;
  newHref: string;
  newLabel: string;
  placeholder: string;
}) {
  return (
    <div className={styles.adminToolbar}>
      <form className={styles.adminSearch} action={action} method="get" role="search">
        <label className={styles.visuallyHidden} htmlFor="admin-search">
          Search
        </label>
        <input
          id="admin-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={placeholder}
          autoComplete="off"
        />
        {query ? <Link href={action}>Clear</Link> : null}
        <button type="submit">Search</button>
      </form>
      <Link className={styles.primaryButton} href={newHref}>
        + {newLabel}
      </Link>
    </div>
  );
}
