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
          <span className="text-white">
            @{profile.username}
          </span>

          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            href="/login"
            className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}