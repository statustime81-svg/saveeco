import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export type Category = {
  id: string;
  slug: string;
  name: string;
  name_hi?: string | null;
  description?: string | null;
  image_url?: string | null;
  parent_id?: string | null;
  sort_order: number;
};

async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, slug, name_en, name_hi, description_en, image_url, parent_id, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    slug: row.slug,
    name: row.name_en,
    name_hi: row.name_hi,
    description: row.description_en,
    image_url: row.image_url,
    parent_id: row.parent_id,
    sort_order: row.sort_order ?? 0,
  }));
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}