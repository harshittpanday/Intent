"use client";

import { useEffect, useState } from "react";

type Props = {
  topic: string;
};

export default function AISummary({ topic }: Props) {
  const [summary, setSummary] = useState("Generating summary...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/summary?q=${encodeURIComponent(topic)}`
        );

        const data = await res.json();

        setSummary(data.summary || "No summary available.");
      } catch (err) {
        console.error(err);
        setSummary("Failed to generate summary.");
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [topic]);

  return (
    <div className="rounded-xl bg-slate-800 p-4">
      {loading ? (
        <p className="text-slate-400">Generating AI summary...</p>
      ) : (
        <p className="leading-7 text-slate-200 whitespace-pre-wrap">
          {summary}
        </p>
      )}
    </div>
  );
}