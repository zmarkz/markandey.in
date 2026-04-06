export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-indigo-500/10 text-indigo-400 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider">
      {children}
    </span>
  );
}
