"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Search any topic...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const search = () => {
    const value = query.trim();

    if (!value) return;

    router.push(`/topic/${encodeURIComponent(value)}`);
  };

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") search();
      }}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-lg text-white placeholder:text-slate-400 outline-none focus:border-blue-500 transition"
    />
  );
}