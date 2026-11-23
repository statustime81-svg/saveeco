import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export function useSettings<T extends Record<string, unknown> = Record<string, unknown>>() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return {} as T;
      const { data, error } = await supabase.from("site_settings").select("setting_key, setting_value").eq("is_public", true);
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row) => [row.setting_key, row.setting_value])) as T;
    },
  });
}
