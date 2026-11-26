import AdminResourcePage, {
  type AdminField,
} from "../../components/admin/AdminResourcePage";

const fields: AdminField[] = [
  { key: "title_en", label: "Title (English)" },
  { key: "image_url", label: "Photo / video thumbnail", type: "image", required: true },
  { key: "media_type", label: "Media type (photo/video)", defaultValue: "photo" },
  { key: "video_url", label: "Video URL (for video entries)" },
  { key: "category", label: "Gallery category" },
  { key: "sort_order", label: "Display order", type: "number", defaultValue: "0" },
  { key: "is_active", label: "Visible on website", type: "checkbox", defaultValue: true },
];

export default function AdminGallery() {
  return (
    <AdminResourcePage
      table="gallery_items"
      title="Gallery"
      description="Manage photos shown in the Save Eco gallery."
      fields={fields}
      orderBy="sort_order"
    />
  );
}
