import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "title_en", label: "Certificate title (English)", required: true },
  { key: "issuer", label: "Issuer" },
  { key: "certificate_number", label: "Certificate number" },
  { key: "image_url", label: "Certificate image", type: "image" },
  { key: "document_url", label: "Certificate document", type: "document" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminCertificates() {
  return (
    <AdminResourcePage
      table="certificates"
      title="Certificates"
      description="Manage certificates displayed on the website."
      fields={fields}
      orderBy="sort_order"
    />
  );
}
