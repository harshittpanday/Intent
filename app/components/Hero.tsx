import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="text-center py-24">
      <h1 className="text-6xl font-black mb-6">
        INTENT
      </h1>

      <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
        Understand any topic through multiple perspectives,
        not just a list of links.
      </p>

      <div className="max-w-2xl mx-auto">
        <SearchBar />
      </div>
    </section>
  );
}