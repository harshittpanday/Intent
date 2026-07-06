import SectionCard from "@/app/components/SectionCard";
import TopicNavbar from "@/app/components/TopicNavbar";
import Comments from "@/app/components/comments";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;

  const topic = decodeURIComponent(slug);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">

        <TopicNavbar />

        <div className="mb-12">
  <h1 className="text-5xl font-black">
    {topic}
  </h1>

  <p className="mt-4 text-lg text-slate-400">
    Everything about <span className="text-white">{topic}</span> in one place.
  </p>

  <div className="mt-6 flex flex-wrap gap-3">
    <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
      🌍 Topic
    </span>

    <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
      📚 Learning
    </span>

    <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
      🔥 Trending
    </span>
  </div>
</div>

       

        <div className="space-y-8">

          <SectionCard
            title="AI Summary"
            icon="🧠"
          >
            <p className="text-slate-400">
              AI summary will appear here.
            </p>
          </SectionCard>

          <SectionCard
            title="Discussions"
            icon="🔥"
          >
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-800 p-4">
                Reddit discussions will appear here.
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                X posts will appear here.
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Videos"
            icon="🎥"
          >
            <div className="rounded-xl bg-slate-800 p-4">
              YouTube videos will appear here.
            </div>
          </SectionCard>

          <SectionCard
            title="Official Resources"
            icon="📚"
          >
            <div className="rounded-xl bg-slate-800 p-4">
              Documentation and trusted sources.
            </div>
          </SectionCard>

          <SectionCard
            title="Community"
            icon="💬"
          >
            <div className="rounded-xl bg-slate-800 p-4">
              <Comments topic={topic} />
            </div>
          </SectionCard>

        </div>

      </div>
    </main>
  );
}