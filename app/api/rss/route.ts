import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("q");

  if (!topic) {
    return NextResponse.json(
      { error: "Missing topic" },
      { status: 400 }
    );
  }

  try {
const rss = encodeURIComponent(
  `https://news.google.com/rss/search?q=${topic}+programming+OR+software+OR+developer+-football+-trump`
);
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${rss}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch news." },
      { status: 500 }
    );
  }
}