import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
        q
      )}&limit=8&namespace=0&format=json&origin=*`
    );

    const data = await res.json();

    return NextResponse.json(data[1] || []);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}