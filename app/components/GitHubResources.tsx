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

  if (loading)
    return (
      <p className="text-slate-400">
        Loading repositories...
      </p>
    );

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