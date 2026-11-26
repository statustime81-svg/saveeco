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
  social?: Record<string, unknown> | null;
  sort_order: number;
  is_active: boolean;
};

type TeamMemberRow = {
  id: string;
  name: string;
  designation_en: string | null;
  designation_hi: string | null;
  bio_en: string | null;
  bio_hi: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, designation_en, designation_hi, bio_en, bio_hi, image_url, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;

  return ((data ?? []) as TeamMemberRow[]).map((member) => ({
    id: member.id,
    name: member.name,
    designation: member.designation_en ?? "",
    designation_hi: member.designation_hi,
    photo_url: member.image_url,
    message: member.bio_en,
    message_hi: member.bio_hi,
    group_type: "team",
    social: null,
    sort_order: member.sort_order,
    is_active: member.is_active,
  }));
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
  });
}
