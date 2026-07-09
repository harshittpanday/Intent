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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explain "${topic}" in under 150 words. Give a beginner-friendly overview without markdown.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("Gemini Response:");
    console.log(JSON.stringify(data, null, 2));

    return NextResponse.json({
      summary:
        data.candidates?.[0]?.content?.parts?.[0]?.text ?? null,
      raw: data,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}