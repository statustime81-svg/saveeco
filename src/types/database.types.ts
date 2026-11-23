export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProfileRow = {
  id: string;
  full_name: string | null;
  role: "admin" | "editor" | "viewer";
  created_at: string;
  updated_at: string;
};

export type CategoryRow = {
  id: string;
  parent_id: string | null;
  name_en: string;
  name_hi: string | null;
  slug: string;
  description_en: string | null;
  description_hi: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductRow = {
  id: string;
  category_id: string | null;
  name_en: string;
  name_hi: string | null;
  slug: string;
  description_en: string | null;
  description_hi: string | null;
  benefits_en: string[];
  benefits_hi: string[];
  how_to_use_en: string | null;
  how_to_use_hi: string | null;
  dosage: Json;
  pack_sizes: Json;
  images: Json;
  price: number | null;
  show_price: boolean;
  is_upcoming: boolean;
  is_featured: boolean;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadStatus = "new" | "contacted" | "closed";

export type EnquiryRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  subject: string | null;
  message: string;
  consent: boolean;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
};

export type PartnerLeadRow = {
  id: string;
  partner_type: "direct" | "channel";
  name: string;
  firm_name: string | null;
  phone: string;
  email: string | null;
  state: string | null;
  city: string | null;
  district: string | null;
  address: string | null;
  gst_number: string | null;
  experience: string | null;
  sponsor_id: string | null;
  message: string | null;
  consent: boolean;
  status: LeadStatus | "approved" | "rejected";
  created_at: string;
  updated_at: string;
};
