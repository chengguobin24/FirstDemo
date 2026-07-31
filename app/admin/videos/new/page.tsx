import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { VideoEditor } from "@/components/VideoEditor";
import { getAdminIdentity } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function NewVideoPage() {
  const identity = await getAdminIdentity(await headers());
  if (!identity) redirect("/admin/login?next=/admin/videos/new");
  return <VideoEditor />;
}
