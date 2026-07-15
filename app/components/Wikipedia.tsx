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
  return (
    <div className="animate-pulse rounded-xl bg-slate-800 p-5">
      <div className="flex gap-5">
        <div className="h-32 w-32 rounded-xl bg-slate-700" />

        <div className="flex-1">
          <div className="h-7 w-56 rounded bg-slate-700" />

          <div className="mt-5 h-4 w-full rounded bg-slate-700" />
          <div className="mt-2 h-4 w-11/12 rounded bg-slate-700" />
          <div className="mt-2 h-4 w-9/12 rounded bg-slate-700" />

          <div className="mt-6 h-10 w-36 rounded-lg bg-slate-700" />
        </div>
      </div>
    </div>
  );
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

<p className="mt-3 line-clamp-4 text-slate-300 leading-7">
  {wiki.summary}
</p>

{wiki.url && (
  <a
    href={wiki.url}
    target="_blank"
    rel="noreferrer"
    className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
  >
    📖 Read Article →
  </a>
)}
        </div>
      </div>
    </div>
  );
}