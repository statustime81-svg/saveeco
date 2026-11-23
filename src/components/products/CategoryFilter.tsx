export type CategoryFilterItem = { slug: string; name: string };
type CategoryFilterProps = { items: CategoryFilterItem[]; value: string; onChange: (slug: string) => void; allLabel?: string };

export default function CategoryFilter({ items, value, onChange, allLabel = "All products" }: CategoryFilterProps) {
  return <div className="flex flex-wrap gap-2" aria-label="Filter by category">
    <button type="button" aria-pressed={value === "all"} onClick={() => onChange("all")} className={`rounded-full px-4 py-2 text-sm font-medium ${value === "all" ? "bg-primary text-white" : "bg-primary-light text-primary-dark"}`}>{allLabel}</button>
    {items.map((item) => <button key={item.slug} type="button" aria-pressed={value === item.slug} onClick={() => onChange(item.slug)} className={`rounded-full px-4 py-2 text-sm font-medium ${value === item.slug ? "bg-primary text-white" : "bg-primary-light text-primary-dark"}`}>{item.name}</button>)}
  </div>;
}
