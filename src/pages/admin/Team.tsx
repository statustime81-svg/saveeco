import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "name", label: "Name", required: true },
  { key: "designation_en", label: "Designation (English)" },
  { key: "designation_hi", label: "Designation (Hindi)" },
  { key: "bio_en", label: "Bio (English)", type: "textarea" },
  { key: "bio_hi", label: "Bio (Hindi)", type: "textarea" },
  { key: "image_url", label: "Team photo", type: "image" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminTeam() {
  return (
    <AdminResourcePage
      table="team_members"
      title="Team"
      description="Manage team members shown on the website."
      fields={fields}
      orderBy="sort_order"
    />
  );
}
