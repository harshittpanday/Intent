"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { toast } from "sonner";

type Props = {
  topic: string;
};

type Comment = {
  id: string;
  displayName: string;
  username: string;
  text: string;
};

export default function Comments({ topic }: Props) {
  const { profile } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  async function loadComments() {
    const q = query(
      collection(db, "comments"),
      where("topic", "==", topic),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    setComments(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, "id">),
      }))
    );
  }

  useEffect(() => {
    loadComments();
  }, [topic]);

  async function handlePost() {
    if (!profile) {
      toast.error("Please log in.");
      return;
    }

    if (!text.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    await addDoc(collection(db, "comments"), {
      topic,
      uid: profile.uid,
      displayName: profile.displayName,
      username: profile.username,
      text,
      createdAt: serverTimestamp(),
    });

    setText("");
    toast.success("Comment posted!");

    loadComments();
  }

  return (
    <div className="space-y-6">
      {profile && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full rounded-xl bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          <button
            onClick={handlePost}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-700 transition"
          >
            Post Comment
          </button>
        </>
      )}

      {!profile && (
        <p className="text-slate-400">
          Please log in to join the discussion.
        </p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl bg-slate-800 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                👤
              </div>

              <div className="flex-1">
                <Link
                  href={`/${comment.username}`}
                  className="block font-bold hover:text-blue-400 transition"
                >
                  {comment.displayName}
                </Link>

                <Link
                  href={`/${comment.username}`}
                  className="block text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  @{comment.username}
                </Link>

                <p className="mt-3 text-slate-200 whitespace-pre-wrap">
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="rounded-xl bg-slate-800 p-6 text-center text-slate-400">
            No comments yet. Be the first to start the discussion! 💬
          </div>
        )}
      </div>
    </div>
  );
}