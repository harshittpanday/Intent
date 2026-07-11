"use client";

import { useEffect, useState } from "react";

type Wiki = {
  title: string;
  summary: string;
  image: string | null;
  url: string | null;
};

export default function Wikipedia({ topic }: { topic: string }) {
  const [wiki, setWiki] = useState<Wiki | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWiki() {
      try {
        const res = await fetch(
          `/api/wiki?q=${encodeURIComponent(topic)}`
        );

        const data = await res.json();

        setWiki(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadWiki();
  }, [topic]);

  if (loading) {
    return <p className="text-slate-400">Loading Wikipedia...</p>;
  }

  if (!wiki || !wiki.summary) {
    return <p className="text-slate-400">No Wikipedia article found.</p>;
  }

  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <div className="flex gap-5">
        {wiki.image && (
          <img
            src={wiki.image}
            alt={wiki.title}
            className="h-32 w-32 rounded-xl object-cover"
          />
        )}

        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {wiki.title}
          </h2>

          <p className="mt-3 text-slate-300 leading-7">
            {wiki.summary}
          </p>

          {wiki.url && (
            <a
              href={wiki.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-blue-400 hover:underline"
            >
              Read on Wikipedia →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}