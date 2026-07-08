import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query." },
      { status: 400 }
    );
  }

const url =
  `https://www.googleapis.com/youtube/v3/search` +
  `?part=snippet` +
  `&type=video` +
  `&maxResults=5` +
  `&q=${encodeURIComponent(query)}` +
  `&relevanceLanguage=en` +
  `&regionCode=US` +
  `&safeSearch=moderate` +
  `&key=${process.env.YOUTUBE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}