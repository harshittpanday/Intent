type SectionCardProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  icon,
  children,
}: SectionCardProps) {
  return (
    <section
      className="
        rounded-2xl
        border border-slate-800
        bg-slate-900/60
        backdrop-blur
        p-6
        shadow-lg
        hover:border-slate-700
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
        <span className="text-3xl">{icon}</span>
        {title}
      </h2>

      {children}
    </section>
  );
}