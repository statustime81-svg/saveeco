import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  designation_hi?: string | null;
  photo_url?: string | null;
  message?: string | null;
  message_hi?: string | null;
  group_type: "leadership" | "team";
  social?: Record<string, string> | null;
  sort_order: number;
  is_active: boolean;
};

async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("team_members")
    .select(
      "id, name, designation, designation_hi, photo_url, message, message_hi, group_type, social, sort_order, is_active",
    )
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;

  return (data ?? []) as unknown as TeamMember[];
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
  });
}