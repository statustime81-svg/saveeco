import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export type PublicContentTable = "banners" | "team_members" | "testimonials" | "faqs" | "certificates" | "site_stats" | "gallery_items";

async function fetchContent(table: PublicContentTable) {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await (supabase as any).from(table).select("*").eq("is_active", true).order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export function useContent<T = Record<string, unknown>>(table: PublicContentTable) {
  return useQuery<T[]>({ queryKey: ["content", table], queryFn: () => fetchContent(table) as Promise<T[]> });
}
