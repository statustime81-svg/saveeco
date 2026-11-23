import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "name_en", label: "Product name (English)", required: true },
  { key: "name_hi", label: "Product name (Hindi)" },
  { key: "slug", label: "URL slug", required: true },
  { key: "category_id", label: "Category ID" },
  { key: "description_en", label: "Description (English)", type: "textarea" },
  { key: "description_hi", label: "Description (Hindi)", type: "textarea" },
  { key: "benefits_en", label: "Benefits (English JSON)", type: "json", defaultValue: "[]" },
  { key: "benefits_hi", label: "Benefits (Hindi JSON)", type: "json", defaultValue: "[]" },
  { key: "how_to_use_en", label: "How to use (English)", type: "textarea" },
  { key: "how_to_use_hi", label: "How to use (Hindi)", type: "textarea" },
  { key: "dosage", label: "Dosage JSON", type: "json", defaultValue: "{}" },
  { key: "pack_sizes", label: "Pack sizes JSON", type: "json", defaultValue: "[]" },
  { key: "images", label: "Product images JSON", type: "images", defaultValue: "[]" },
  { key: "price", label: "Price", type: "number" },
  { key: "show_price", label: "Show price", type: "checkbox", defaultValue: false },
  { key: "is_upcoming", label: "Upcoming product", type: "checkbox", defaultValue: false },
  { key: "is_featured", label: "Featured product", type: "checkbox", defaultValue: false },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
  { key: "seo_title", label: "SEO title" },
  { key: "seo_description", label: "SEO description", type: "textarea" },
];

export default function AdminProducts() {
  return (
    <AdminResourcePage
      table="products"
      title="Products"
      description="Add and update product information."
      fields={fields}
    />
  );
}
