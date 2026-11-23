import { useState, type ChangeEvent } from "react";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function AdminImageUpload({
  value,
  onChange,
  label = "Image",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Image file select karo.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image 5 MB se chhoti honi chahiye.");
      return;
    }

    const client = supabase;

    if (!client) {
      setError("Supabase URL ya anon key configure nahi hai.");
      return;
    }

    setError("");
    setUploading(true);

    const fileName = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
    const { data, error: uploadError } = await client.storage
      .from("public-media")
      .upload(fileName, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicData } = client.storage
      .from("public-media")
      .getPublicUrl(data.path);

    onChange(publicData.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {value && (
        <div className="relative mb-3 w-fit">
          <img
            src={value}
            alt="Selected upload"
            className="h-32 w-48 rounded-lg border border-slate-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="absolute -right-2 -top-2 rounded-full bg-white p-1 text-slate-700 shadow"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        {uploading ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : (
          <ImagePlus size={16} />
        )}
        {uploading ? "Uploading…" : "Choose image"}
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleFileChange}
          className="sr-only"
        />
      </label>

      <p className="mt-2 text-xs text-slate-500">
        JPG, PNG, WebP. Maximum 5 MB.
      </p>

      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}