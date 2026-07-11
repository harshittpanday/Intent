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
    // Step 1: Search Wikipedia
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
        topic
      )}&limit=1&namespace=0&format=json&origin=*`
    );

    const searchData = await searchRes.json();

    const pageTitle = searchData[1]?.[0];

    if (!pageTitle) {
      return NextResponse.json(
        { error: "No Wikipedia page found." },
        { status: 404 }
      );
    }

    // Step 2: Fetch summary of the best result
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        pageTitle
      )}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    const summary = await summaryRes.json();

    return NextResponse.json({
      title: summary.title,
      summary: summary.extract,
      image: summary.thumbnail?.source || null,
      url: summary.content_urls?.desktop?.page || null,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch Wikipedia." },
      { status: 500 }
    );
  }
}