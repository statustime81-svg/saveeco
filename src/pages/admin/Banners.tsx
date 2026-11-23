import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "title_en", label: "Title (English)" },
  { key: "title_hi", label: "Title (Hindi)" },
  { key: "subtitle_en", label: "Subtitle (English)" },
  { key: "subtitle_hi", label: "Subtitle (Hindi)" },
  { key: "image_url", label: "Banner image", type: "image", required: true },
  { key: "link_url", label: "Link URL" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminBanners() {
  return (
    <AdminResourcePage
      table="banners"
      title="Banners"
      description="Manage homepage banners."
      fields={fields}
      orderBy="sort_order"
    />
  );
}
