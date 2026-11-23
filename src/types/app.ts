export type CategoryReference = {
  slug: string;
  name: string;
  parent?: {
    slug: string;
    name: string;
  } | null;
};

export type ProductDosage = {
  crop?: string;
  application?: string;
  dose?: string;
  frequency?: string;
};

export type Product = {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  name_hi?: string | null;
  short_description?: string | null;
  description?: string | null;
  benefits?: string[];
  how_to_use?: string | null;
  dosage?: ProductDosage[];
  pack_sizes?: string[];
  images?: string[];
  price?: number | null;
  show_price: boolean;
  is_upcoming: boolean;
  is_featured: boolean;
  is_active: boolean;
  category?: CategoryReference | null;
};