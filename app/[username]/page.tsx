"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

type Profile = {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: any;
};

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { profile: currentUser } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setProfile(snapshot.docs[0].data() as Profile);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading profile...
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        User not found.
      </main>
    );
  }

  const isOwner = currentUser?.uid === profile.uid;

  const joinedDate =
    profile.createdAt?.toDate?.().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }) || "Recently";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl bg-slate-900 p-8">

          <div className="flex items-center gap-6">

            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-700">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.displayName}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl">
                  👤
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-black">
                {profile.displayName}
              </h1>

              <p className="text-xl text-slate-400">
                @{profile.username}
              </p>
            </div>

          </div>

          <p className="mt-8 text-slate-300">
            {profile.bio || "No bio yet."}
          </p>

          <p className="mt-4 text-slate-400">
            📅 Joined {joinedDate}
          </p>

          {isOwner && (
            <div className="mt-8">
              <Link
                href="/settings"
                className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
              >
                ✏️ Edit Profile
              </Link>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}