import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "setting_key", label: "Setting key", required: true },
  {
    key: "setting_value",
    label: "Setting value (JSON)",
    type: "json",
    required: true,
    defaultValue: "{}",
  },
  {
    key: "is_public",
    label: "Available to the public website",
    type: "checkbox",
    defaultValue: true,
  },
];

export default function SiteSettings() {
  return (
    <AdminResourcePage
      table="site_settings"
      title="Site settings"
      description="Manage public website settings."
      fields={fields}
      orderBy="updated_at"
    />
  );
}