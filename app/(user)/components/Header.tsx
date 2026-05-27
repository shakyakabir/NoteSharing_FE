export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Good morning, Alex 👋</h2>
        <p className="text-gray-500 text-sm">Ready to ace your semester?</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          className="px-3 py-2 border rounded-lg w-64"
          placeholder="Search notes..."
        />
        <span>🔔</span>
        <span>👤</span>
      </div>
    </div>
  );
}
