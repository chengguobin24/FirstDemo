import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionMaxAge,
  createAdminSessionToken,
  isValidAdminPassword,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function safeNext(value: FormDataEntryValue | null): string {
  return typeof value === "string" &&
    value.startsWith("/admin") &&
    !value.startsWith("/admin/login")
    ? value
    : "/admin";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const next = safeNext(formData.get("next"));
  const password = formData.get("password");

  if (typeof password !== "string" || !isValidAdminPassword(password)) {
    return NextResponse.redirect(new URL(`/admin/login?error=1&next=${encodeURIComponent(next)}`, request.url), 303);
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.redirect(new URL(`/admin/login?error=1&next=${encodeURIComponent(next)}`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: adminSessionMaxAge(),
  });
  return response;
}
