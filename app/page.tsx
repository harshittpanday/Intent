import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrendingTopics from "./components/TrendingTopics";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <Navbar />

        <Hero />

        <TrendingTopics />

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 pb-24">
          <FeatureCard
            icon="🧠"
            title="AI Summary"
            description="Quickly grasp the key ideas behind any topic."
          />

          <FeatureCard
            icon="💬"
            title="Community"
            description="See discussions and different viewpoints."
          />

          <FeatureCard
            icon="🎥"
            title="Videos"
            description="Watch the best educational content in one place."
          />

          <FeatureCard
            icon="📚"
            title="Trusted Sources"
            description="Access official documentation and reliable references."
          />
        </section>
      </div>
    </main>
  );
}