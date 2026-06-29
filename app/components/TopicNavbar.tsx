"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopicNavbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <button
          onClick={() => router.back()}
          className="text-slate-400 hover:text-white transition"
        >
          ← Back
        </button>

        <Link
          href="/"
          className="text-2xl font-black tracking-wide"
        >
          INTENT
        </Link>

        <button className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800 transition">
          🔖 Save
        </button>
      </div>
    </header>
  );
}