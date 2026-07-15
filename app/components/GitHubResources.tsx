"use client";

import { useEffect, useState } from "react";

type Repo = {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
};

export default function GitHubResources({
  topic,
}: {
  topic: string;
}) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      try {
        const res = await fetch(
          `/api/github?q=${encodeURIComponent(topic)}`
        );

        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, [topic]);

if (loading) {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-slate-800 p-4"
        >
          <div className="h-6 w-2/3 rounded bg-slate-700" />
          <div className="mt-3 h-4 w-full rounded bg-slate-700" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-700" />
          <div className="mt-4 h-4 w-20 rounded bg-slate-700" />
        </div>
      ))}
    </div>
  );
}

  if (!repos.length)
    return (
      <p className="text-slate-400">
        No repositories found.
      </p>
    );

  return (
    <div className="space-y-4">
      {repos.slice(0, 5).map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition"
        >
          <h3 className="font-bold">
            {repo.full_name}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {repo.description || "No description"}
          </p>

          <p className="mt-3 text-yellow-400">
            ⭐ {repo.stargazers_count.toLocaleString()}
          </p>
        </a>
      ))}
    </div>
  );
}