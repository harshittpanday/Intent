// lib/ranking.ts

export function getSectionOrder(query: string) {
  const q = query.toLowerCase();

  const order = [
    "wiki",
    "github",
    "youtube",
    "news",
    "stackoverflow",
  ];

  if (
    q.includes("error") ||
    q.includes("bug") ||
    q.includes("issue") ||
    q.includes("fix")
  ) {
    return [
      "stackoverflow",
      "github",
      "wiki",
      "youtube",
      "news",
    ];
  }

  if (
    q.includes("learn") ||
    q.includes("tutorial") ||
    q.includes("course")
  ) {
    return [
      "youtube",
      "wiki",
      "github",
      "stackoverflow",
      "news",
    ];
  }

  if (
    q.includes("news") ||
    q.includes("release") ||
    q.includes("update")
  ) {
    return [
      "news",
      "github",
      "wiki",
      "youtube",
      "stackoverflow",
    ];
  }

  if (
    q.includes("github") ||
    q.includes("repo") ||
    q.includes("repository")
  ) {
    return [
      "github",
      "wiki",
      "stackoverflow",
      "youtube",
      "news",
    ];
  }

  return order;
}