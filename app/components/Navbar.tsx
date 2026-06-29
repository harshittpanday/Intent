export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-black tracking-wide">
        INTENT
      </h1>

      <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-medium">
        Sign In
      </button>
    </nav>
  );
}