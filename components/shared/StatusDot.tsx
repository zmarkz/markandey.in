export function StatusDot({
  status,
  label,
}: {
  status: "online" | "offline" | "degraded";
  label: string;
}) {
  const colors = {
    online: "bg-green-500",
    degraded: "bg-amber-500",
    offline: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />
      <span className="font-mono text-xs text-zinc-500">{label}</span>
    </div>
  );
}
