import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/AdminEditor";
import { getAdminIdentity } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const identity = await getAdminIdentity(await headers());
  if (!identity) redirect("/admin/login?next=/admin/posts/new");
  return <AdminEditor />;
}
