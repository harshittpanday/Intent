type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
}