import type { JsonStats as JsonStatsType } from "../types"

type JsonStatsProps = {
  stats: JsonStatsType
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

export function JsonStats({ stats }: JsonStatsProps) {
  const pills: { label: string; value: string | number }[] = [
    { label: "Depth", value: stats.maxDepth },
    { label: "Keys", value: stats.keyCount },
    { label: "Arrays", value: stats.arrayCount },
    { label: "Size", value: formatBytes(stats.sizeBytes) },
  ]

  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-1">
      {pills.map(({ label, value }) => (
        <span key={label} className="flex items-center gap-1 text-[10px]">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium tabular-nums text-foreground/70">
            {value}
          </span>
        </span>
      ))}
    </div>
  )
}
