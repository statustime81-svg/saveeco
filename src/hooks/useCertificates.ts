import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export type Certificate = {
  id: string;
  title: string;
  issuer?: string | null;
  number?: string | null;
  image_url?: string | null;
  pdf_url?: string | null;
  sort_order: number;
  is_active: boolean;
};

async function fetchCertificates(): Promise<Certificate[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("certificates")
    .select("id, title_en, issuer, certificate_number, image_url, document_url, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.title_en,
    issuer: row.issuer,
    number: row.certificate_number,
    image_url: row.image_url,
    pdf_url: row.document_url,
    sort_order: row.sort_order,
    is_active: row.is_active,
  })) as Certificate[];
}

export function useCertificates() {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
  });
}
