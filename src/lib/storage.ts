import { supabase } from "./supabase";

export async function uploadAdminAsset(file: File, folder: string, bucket: "public-media" | "documents" = "public-media") {
  if (!supabase) throw new Error("Supabase URL ya anon key configure nahi hai.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
