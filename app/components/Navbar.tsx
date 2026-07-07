"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Navbar() {
  const { profile, loading } = useAuth();

  return (
    <nav className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-2xl font-black tracking-wide"
      >
        INTENT
      </Link>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : profile ? (
        <div className="flex items-center gap-4">
          <Link
            href={`/${profile.username}`}
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
<div className="size-10 flex-none overflow-hidden rounded-full border border-slate-700 bg-slate-700">
  {profile.avatar ? (
<img
  src={profile.avatar}
  alt={profile.displayName}
  width={40}
  height={40}
  className="h-10 w-10 rounded-full object-cover"
 />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-lg">
      👤
    </div>
  )}
</div>
            <span className="font-medium text-white">
              @{profile.username}
            </span>
          </Link>

          <button
            onClick={() => signOut(auth)}
            className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-slate-800 px-5 py-2 hover:bg-slate-700"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-5 py-2 hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}