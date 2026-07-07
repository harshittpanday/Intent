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
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setBio(profile.bio);
      setAvatar(profile.avatar || "");
    }
  }, [profile]);

  async function uploadAvatar(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "intent-avatar");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djzswz73a/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Upload failed.");
      }

      setAvatar(data.secure_url);

      toast.success("Avatar uploaded!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    }

    setUploading(false);
  }

  const handleSave = async () => {
    if (!profile) return;

    try {
      await updateDoc(doc(db, "users", profile.uid), {
        displayName,
        bio,
        avatar,
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
        <h1 className="mb-8 text-4xl font-black">
          Settings
        </h1>

        <div className="mb-6 flex justify-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800">
            {avatar ? (
<img
  src={profile.avatar}
  alt={profile.displayName}
  width={120}
  height={120}
  className="h-10 w-10 rounded-full object-cover"
 />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl">
                👤
              </div>
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mb-4 w-full rounded-lg bg-slate-800 p-3"
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          className="w-full rounded-lg bg-slate-800 p-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              uploadAvatar(file);
            }
          }}
          className="mt-4 mb-4 block w-full"
        />

        {uploading && (
          <p className="mb-4 text-sm text-slate-400">
            Uploading avatar...
          </p>
        )}

        <button
          onClick={handleSave}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}