import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "person_name", label: "Person name", required: true },
  { key: "location", label: "Location" },
  { key: "message_en", label: "Message (English)", type: "textarea", required: true },
  { key: "image_url", label: "Image URL" },
  { key: "rating", label: "Rating (1–5)", type: "number" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminTestimonials() {
  return (
    <AdminResourcePage
      table="testimonials"
      title="Testimonials"
      description="Manage approved customer testimonials."
      fields={fields}
      orderBy="sort_order"
    />
  );
}