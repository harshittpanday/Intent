"use client";

import { useEffect, useState } from "react";

type Question = {
  id: number;
  title: string;
  score: number;
  answers: number;
  views: number;
  url: string;
  tags: string[];
};

export default function StackOverflow({
  topic,
}: {
  topic: string;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch(
          `/api/stackoverflow?q=${encodeURIComponent(topic)}`
        );

        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [topic]);

  if (loading) {
    return (
      <p className="text-slate-400">
        Loading Stack Overflow...
      </p>
    );
  }

  if (!questions.length) {
    return (
      <p className="text-slate-400">
        No questions found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <a
          key={q.id}
          href={q.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition"
        >
          <h3
            className="font-semibold"
            dangerouslySetInnerHTML={{ __html: q.title }}
          />

          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-400">
            <span>⭐ {q.score}</span>
            <span>💬 {q.answers} answers</span>
            <span>👀 {q.views.toLocaleString()} views</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {q.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-700 px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}