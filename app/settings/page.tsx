"use client";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setBio(profile.bio);
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      await updateDoc(doc(db, "users", profile.uid), {
        displayName,
        bio,
      });

      toast.success("Profile updated!");

      router.push(`/${profile.username}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        You must be logged in.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-4xl font-black mb-8">
          Settings
        </h1>

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3 mb-4"
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          className="w-full rounded-lg bg-slate-800 p-3"
        />

        <button
          onClick={handleSave}
          className="mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold transition"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}