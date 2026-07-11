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
    const res = await fetch(
      `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(
        topic
      )}&site=stackoverflow&pagesize=5`,
      {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Stack Overflow");
    }

    const data = await res.json();

    const questions = data.items.map((item: any) => ({
      id: item.question_id,
      title: item.title,
      score: item.score,
      answers: item.answer_count,
      views: item.view_count,
      url: item.link,
      tags: item.tags,
    }));

    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch Stack Overflow." },
      { status: 500 }
    );
  }
}