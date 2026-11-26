import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

// Product photos are selected from the computer and uploaded to site storage.
const fields: AdminField[] = [
  { key: "name_en", label: "Product name", required: true },
  { key: "slug", label: "URL slug", required: true },
  {
    key: "category_id",
    label: "Category / subcategory",
    type: "product-category",
    required: true,
  },
  { key: "description_en", label: "Description", type: "textarea" },
  {
    key: "benefits_en",
    label: "Benefits",
    type: "text-array",
    placeholder: "One benefit per line",
  },
  { key: "how_to_use_en", label: "How to use", type: "textarea" },
  {
    key: "dosage_application",
    label: "Application method",
    type: "dosage-application",
    placeholder: "Soil application during soil preparation",
  },
  {
    key: "dosage_dose",
    label: "Dose",
    type: "dosage-dose",
    placeholder: "10 kg per acre",
  },
  {
    key: "pack_sizes",
    label: "Pack sizes",
    type: "text-array",
    placeholder: "One pack size per line",
  },
  { key: "images", label: "Product photos", type: "image-list" },
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
      description="Add product details and choose photos directly from your computer."
      fields={fields}
    />
  );
}
