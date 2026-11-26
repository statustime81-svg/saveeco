import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "label_en", label: "Label (English)", required: true },
  { key: "value", label: "Value", type: "number", required: true },
  { key: "suffix", label: "Value suffix" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function SiteStats() {
  return (
    <AdminResourcePage
      table="site_stats"
      title="Website statistics"
      description="Manage the statistics displayed on the website."
      fields={fields}
      orderBy="sort_order"
    />
  );
}