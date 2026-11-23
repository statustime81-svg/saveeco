type SkeletonLoaderProps = { rows?: number; className?: string };

export default function SkeletonLoader({ rows = 3, className = "" }: SkeletonLoaderProps) {
  return (
    <div aria-label="Loading content" aria-busy="true" className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="animate-pulse rounded-lg bg-slate-200" style={{ height: index === 0 ? 28 : 16, width: index === 0 ? "55%" : `${88 - index * 8}%` }} />
      ))}
    </div>
  );
}
