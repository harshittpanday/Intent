const topics = [
  "AI",
  "React",
  "Cybersecurity",
  "Harvard",
  "Linux",
  "Startups",
];

export default function TrendingTopics() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold mb-6">
        🔥 Trending Topics
      </h2>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <button
            key={topic}
            className="rounded-full bg-slate-800 px-5 py-3 hover:bg-blue-600 transition"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
}