import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("API /api/admin/publish received:", body);

  // Just echo back a fake slug for now
  return NextResponse.json({
    ok: true,
    slug: "test-slug",
    receivedTitle: body.title,
  });
}
