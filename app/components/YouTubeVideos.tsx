"use client";

import { useEffect, useState } from "react";

type Props = {
  topic: string;
};

type Video = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
};

export default function YouTubeVideos({ topic }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch(
          `/api/youtube?q=${encodeURIComponent(topic)}`
        );

        const data = await res.json();

        setVideos(data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [topic]);

if (loading) {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-slate-800 p-4"
        >
          <div className="flex gap-4">
            <div className="h-24 w-40 rounded-lg bg-slate-700" />

            <div className="flex-1">
              <div className="h-5 w-3/4 rounded bg-slate-700" />
              <div className="mt-3 h-4 w-1/2 rounded bg-slate-700" />
              <div className="mt-2 h-4 w-1/3 rounded bg-slate-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <a
          key={video.id.videoId}
          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="h-24 w-40 rounded-lg object-cover"
          />

          <div>
            <h3 className="font-bold">
              {video.snippet.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {video.snippet.channelTitle}
            </p>

            <p className="text-xs text-slate-500">
              {new Date(
                video.snippet.publishedAt
              ).toLocaleDateString()}
            </p>
          </div>
        </a>
      ))}

      {videos.length === 0 && (
        <div className="rounded-xl bg-slate-800 p-4">
          No videos found.
        </div>
      )}
    </div>
  );
}