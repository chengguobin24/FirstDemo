import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { VideoEditor } from "@/components/VideoEditor";
import { getAdminIdentity } from "@/lib/admin-auth";
import { getAdminVideo } from "@/lib/video-db";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditVideoPage({ params }: PageProps) {
  const identity = await getAdminIdentity(await headers());
  const { id } = await params;
  if (!identity) redirect(`/admin/login?next=/admin/videos/${encodeURIComponent(id)}`);
  const video = await getAdminVideo(id).catch(() => null);
  if (!video) notFound();
  return <VideoEditor initialVideo={video} />;
}
