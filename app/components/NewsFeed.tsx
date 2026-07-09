"use client";

import { useEffect, useState } from "react";

type Props = {
  topic: string;
};

type News = {
  title: string;
  link: string;
  pubDate: string;
};



export default function NewsFeed({ topic }: Props) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch(
          `/api/rss?q=${encodeURIComponent(topic)}`
        );

        const data = await res.json();

        setNews(data.items ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [topic]);

  if (loading) {
    return <p className="text-slate-400">Loading news...</p>;
  }

  if (news.length === 0) {
    return <p className="text-slate-400">No news found.</p>;
  }

  return (
    <div className="space-y-3">
      {news.slice(0, 5).map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition"
        >
          <h3 className="font-semibold">{item.title}</h3>

          <p className="mt-2 text-sm text-slate-400">
            {new Date(item.pubDate).toLocaleDateString()}
          </p>
        </a>
      ))}
    </div>
  );
}