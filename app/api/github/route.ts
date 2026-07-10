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
    const query = `${topic} in:name,description,readme`;

    const res = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        query
      )}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Intent",
        },
      }
    );

    const data = await res.json();

    const repos = (data.items || [])
      .filter((repo: any) => {
        const nameEnglish = /^[\x00-\x7F]*$/.test(repo.full_name);
        const descEnglish =
          !repo.description ||
          /^[\x00-\x7F]*$/.test(repo.description);

        return nameEnglish && descEnglish;
      })
      .slice(0, 5);

    return NextResponse.json(repos);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories." },
      { status: 500 }
    );
  }
}