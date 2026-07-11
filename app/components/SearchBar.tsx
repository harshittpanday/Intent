"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Search any topic...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const router = useRouter();

  const search = (value?: string) => {
    const q = (value ?? query).trim();

    if (!q) return;

    setSuggestions([]);

    router.push(`/topic/${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/suggestions?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") search();
        }}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-lg text-white placeholder:text-slate-400 outline-none focus:border-blue-500 transition"
      />

      {suggestions.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item);
                search(item);
              }}
              className="block w-full border-b border-slate-800 px-5 py-3 text-left hover:bg-slate-800 last:border-none"
            >
              🔍 {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}