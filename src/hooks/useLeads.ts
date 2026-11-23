import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export type LeadTable = "enquiries" | "partner_leads";
export type LeadRecord = { id: string; name: string; phone: string; email: string | null; status: string; created_at: string; [key: string]: unknown };

export function useLeads(table: LeadTable, status = "all") {
  return useQuery({
    queryKey: ["admin-leads", table, status],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) throw new Error("Supabase configuration is missing.");
      let query = (supabase as any).from(table).select("*").order("created_at", { ascending: false });
      if (status !== "all") query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as LeadRecord[];
    },
  });
}
