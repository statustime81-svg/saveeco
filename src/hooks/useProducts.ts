import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Product, ProductDosage } from "../types/app";

type CategoryRecord = {
  id: string;
  slug: string;
  name_en: string;
  parent_id: string | null;
};

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function asDosageArray(value: unknown): ProductDosage[] {
  const rows = Array.isArray(value)
    ? value
    : value && typeof value === "object" && "items" in value
      ? (value as { items?: unknown }).items
      : [];
  return Array.isArray(rows) ? (rows as ProductDosage[]) : [];
}

async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  // Fetch the two tables independently. This avoids PostgREST FK-join errors
  // when the database has a differently named category constraint.
  const [productResult, categoryResult] = await Promise.all([
    supabase.from("products").select("*").eq("is_active", true),
    supabase.from("categories").select("id, slug, name_en, parent_id"),
  ]);

  if (productResult.error) throw productResult.error;
  if (categoryResult.error) throw categoryResult.error;

  const categories = (categoryResult.data ?? []) as CategoryRecord[];
  const categoriesById = new Map(categories.map((category) => [category.id, category]));

  return (productResult.data ?? [])
    .map((row: any) => {
      const category = row.category_id
        ? categoriesById.get(row.category_id)
        : undefined;
      const parent = category?.parent_id
        ? categoriesById.get(category.parent_id)
        : undefined;

      return {
        ...row,
        name: row.name_en ?? row.name ?? "",
        name_hi: row.name_hi ?? null,
        short_description:
          row.short_description_en ?? row.description_en ?? row.short_description ?? null,
        description: row.description_en ?? row.description ?? null,
        benefits: asStringArray(row.benefits_en ?? row.benefits),
        how_to_use: row.how_to_use_en ?? row.how_to_use ?? null,
        dosage: asDosageArray(row.dosage),
        pack_sizes: asStringArray(row.pack_sizes),
        images: asStringArray(row.images),
        category: category
          ? {
              slug: category.slug,
              name: category.name_en,
              parent: parent
                ? { slug: parent.slug, name: parent.name_en }
                : null,
            }
          : null,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "en")) as Product[];
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
