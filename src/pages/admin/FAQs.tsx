import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "question_en", label: "Question (English)", required: true },
  { key: "answer_en", label: "Answer (English)", type: "textarea", required: true },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminFAQs() {
  return (
    <AdminResourcePage
      table="faqs"
      title="FAQs"
      description="Manage frequently asked questions."
      fields={fields}
      orderBy="sort_order"
    />
  );
}