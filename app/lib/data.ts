import { Post } from "./types";

export const posts: Post[] = [
  {
    id: "1",
    topic: "react",
    summary:
      "React is a UI library focused on component-based architecture and state-driven rendering.",
    sources: [
      {
        id: "r1",
        type: "reddit",
        title: "React is still relevant in 2026?",
        url: "https://reddit.com",
      },
      {
        id: "y1",
        type: "youtube",
        title: "React Crash Course",
        url: "https://youtube.com",
      },
    ],
  },
];