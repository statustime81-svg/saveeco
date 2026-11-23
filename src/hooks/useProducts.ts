import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Product } from "../types/app";

async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "*, category:categories!products_category_id_fkey(id, slug, name_en, name_hi, parent_id, parent:categories!categories_parent_id_fkey(slug, name_en, name_hi))",
    )
    .eq("is_active", true)
    .order("name_en");

  if (error) {
    throw error;
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    name: row.name_en,
    short_description: row.description_en,
    description: row.description_en,
    benefits: row.benefits_en ?? [],
    how_to_use: row.how_to_use_en,
    dosage: Array.isArray(row.dosage) ? row.dosage : row.dosage?.items ?? [],
    pack_sizes: Array.isArray(row.pack_sizes) ? row.pack_sizes : [],
    category: row.category ? {
      slug: row.category.slug,
      name: row.category.name_en,
      parent: row.category.parent ? {
        slug: row.category.parent.slug,
        name: row.category.parent.name_en,
      } : null,
    } : null,
  })) as Product[];
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
