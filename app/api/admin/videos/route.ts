import { NextResponse } from "next/server";
import {
  AdminAuthorizationError,
  requireAdminRequest,
} from "@/lib/admin-auth";
import { listAdminVideos, saveVideo } from "@/lib/video-db";

export const dynamic = "force-dynamic";

function errorResponse(error: unknown): NextResponse {
  if (error instanceof AdminAuthorizationError) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
  const message =
    error instanceof Error ? error.message : "The request could not be completed.";
  const status = /required|valid|already exists|unique/i.test(message) ? 400 : 500;
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  try {
    await requireAdminRequest(request);
    return NextResponse.json({ videos: await listAdminVideos() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdminRequest(request);
    const input = await request.json();
    const video = await saveVideo(input, admin.email);
    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
