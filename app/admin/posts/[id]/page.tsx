import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AdminEditor } from "@/components/AdminEditor";
import { getAdminIdentity } from "@/lib/admin-auth";
import { getAdminPost } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: PageProps) {
  const identity = await getAdminIdentity(await headers());
  const { id } = await params;
  if (!identity) redirect(`/admin/login?next=/admin/posts/${encodeURIComponent(id)}`);
  const post = await getAdminPost(id).catch(() => null);
  if (!post) notFound();
  return <AdminEditor initialPost={post} />;
}
