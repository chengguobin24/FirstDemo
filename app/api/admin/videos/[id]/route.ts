import { NextResponse } from "next/server";
import {
  AdminAuthorizationError,
  requireAdminRequest,
} from "@/lib/admin-auth";
import { archiveVideo, getAdminVideo, saveVideo } from "@/lib/video-db";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function errorResponse(error: unknown): NextResponse {
  if (error instanceof AdminAuthorizationError) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
  const message =
    error instanceof Error ? error.message : "The request could not be completed.";
  const status = /not found/i.test(message)
    ? 404
    : /required|valid|already exists|unique/i.test(message)
      ? 400
      : 500;
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request, context: RouteContext) {
  try {
    await requireAdminRequest(request);
    const { id } = await context.params;
    const video = await getAdminVideo(id);
    return video
      ? NextResponse.json({ video })
      : NextResponse.json({ error: "Video not found." }, { status: 404 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const admin = await requireAdminRequest(request);
    const { id } = await context.params;
    const input = await request.json();
    const video = await saveVideo({ ...input, id }, admin.email);
    return NextResponse.json({ video });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const admin = await requireAdminRequest(request);
    const { id } = await context.params;
    await archiveVideo(id, admin.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
