import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "name_en", label: "Name (English)", required: true },
  { key: "slug", label: "URL slug", required: true },
  { key: "parent_id", label: "Parent category", type: "parent-category" },
  { key: "description_en", label: "Description (English)", type: "textarea" },
  { key: "image_url", label: "Category image", type: "image" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminCategories() {
  return (
    <AdminResourcePage
      table="categories"
      title="Categories"
      description="Manage main categories, subcategories, and product assignments in one place."
      fields={fields}
      orderBy="sort_order"
    />
  );
}
