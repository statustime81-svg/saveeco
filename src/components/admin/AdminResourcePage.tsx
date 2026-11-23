import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { uploadAdminAsset } from "../../lib/storage";

export type AdminTable =
  | "categories"
  | "products"
  | "banners"
  | "gallery_items"
  | "team_members"
  | "testimonials"
  | "faqs"
  | "certificates"
  | "site_settings"
  | "site_stats";

export type AdminField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "json" | "image" | "images" | "document";
  required?: boolean;
  defaultValue?: string | boolean;
  placeholder?: string;
};

type ResourceRow = {
  id: string;
  [key: string]: unknown;
};

type Props = {
  table: AdminTable;
  title: string;
  description: string;
  fields: AdminField[];
  orderBy?: string;
};

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-700";

function initialForm(fields: AdminField[]) {
  return Object.fromEntries(
    fields.map((field) => [
      field.key,
      field.defaultValue ?? (field.type === "checkbox" ? false : ""),
    ]),
  ) as Record<string, unknown>;
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function AdminResourcePage({
  table,
  title,
  description,
  fields,
  orderBy = "created_at",
}: Props) {
  const [rows, setRows] = useState<ResourceRow[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(() =>
    initialForm(fields),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadRows() {
    setLoading(true);
    const client = supabase;

    if (!client) {
      setError("Supabase URL ya anon key configure nahi hai.");
      setLoading(false);
      return;
    }

    const db = client as unknown as {
      from: (tableName: AdminTable) => any;
    };

    const { data, error: loadError } = await db
      .from(table)
      .select("*")
      .order(orderBy, { ascending: orderBy === "sort_order" });

    if (loadError) {
      setError(loadError.message);
    } else {
      setError("");
      setRows((data ?? []) as ResourceRow[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadRows();
    // `fields` are fixed by each resource page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy]);

  function openNewForm() {
    setEditingId(null);
    setForm(initialForm(fields));
    setNotice("");
    setError("");
    setFormOpen(true);
  }

  function openEditForm(row: ResourceRow) {
    const nextForm: Record<string, unknown> = {};

    fields.forEach((field) => {
      const value = row[field.key];

      if (field.type === "json" || field.type === "images") {
        nextForm[field.key] =
          value === null || value === undefined
            ? String(field.defaultValue ?? "[]")
            : JSON.stringify(value, null, 2);
      } else {
        nextForm[field.key] =
          value ?? field.defaultValue ?? (field.type === "checkbox" ? false : "");
      }
    });

    setEditingId(row.id);
    setForm(nextForm);
    setNotice("");
    setError("");
    setFormOpen(true);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);

    const client = supabase;

    if (!client) {
      setError("Supabase URL ya anon key configure nahi hai.");
      setSaving(false);
      return;
    }

    const payload: Record<string, unknown> = {};

    try {
      fields.forEach((field) => {
        const value = form[field.key];

        if (field.type === "json" || field.type === "images") {
          payload[field.key] = JSON.parse(String(value || "[]"));
        } else if (field.type === "number") {
          payload[field.key] =
            value === "" || value === null ? null : Number(value);
        } else if (field.type === "checkbox") {
          payload[field.key] = Boolean(value);
        } else {
          payload[field.key] =
            value === "" || value === undefined ? null : value;
        }
      });
    } catch {
      setError("JSON field ka format check karo. JSON valid hona chahiye.");
      setSaving(false);
      return;
    }

    const db = client as unknown as {
      from: (tableName: AdminTable) => any;
    };

    const result = editingId
      ? await db.from(table).update(payload).eq("id", editingId)
      : await db.from(table).insert(payload);

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setNotice(editingId ? "Changes saved." : "New item added.");
    setFormOpen(false);
    setEditingId(null);
    setSaving(false);
    await loadRows();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Kya aap is item ko delete karna chahte hain?");
    if (!confirmed) return;

    const client = supabase;

    if (!client) {
      setError("Supabase URL ya anon key configure nahi hai.");
      return;
    }

    const db = client as unknown as {
      from: (tableName: AdminTable) => any;
    };

    const { error: deleteError } = await db.from(table).delete().eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setNotice("Item deleted.");
    await loadRows();
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="flex items-center gap-2 rounded-lg bg-[#17652b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#125322]"
        >
          <Plus size={17} />
          Add new
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {notice && (
        <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          {notice}
        </p>
      )}

      {formOpen && (
        <form
          onSubmit={handleSave}
          className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {editingId ? "Edit item" : "Add item"}
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              aria-label="Close form"
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            >
              <X size={19} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const value = form[field.key];

              if (field.type === "checkbox") {
                return (
                  <label
                    key={field.key}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          [field.key]: event.target.checked,
                        }))
                      }
                      className="size-4 accent-green-700"
                    />
                    {field.label}
                  </label>
                );
              }

              if (field.type === "textarea" || field.type === "json") {
                return (
                  <label key={field.key} className="text-sm font-medium text-slate-700 sm:col-span-2">
                    {field.label}
                    <textarea
                      required={field.required}
                      rows={field.type === "json" ? 5 : 3}
                      value={String(value ?? "")}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          [field.key]: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                    {field.type === "json" && (
                      <span className="mt-1 block text-xs font-normal text-slate-500">
                        JSON format me value likho.
                      </span>
                    )}
                  </label>
                );
              }

              if (field.type === "image" || field.type === "images" || field.type === "document") {
                return (
                  <label key={field.key} className="text-sm font-medium text-slate-700 sm:col-span-2">
                    {field.label}
                    {field.type === "images" && <textarea rows={4} value={String(value ?? "[]")} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} aria-label="Product image URL JSON array" />}
                    {field.type !== "images" && <input type="url" required={field.required} value={String(value ?? "")} placeholder="https://…" onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} />}
                    <span className="mt-2 block text-xs font-normal text-slate-500">Upload file, or paste a URL{field.type === "images" ? "; uploaded images are added to the JSON list" : ""}.</span>
                    <input type="file" multiple={field.type === "images"} accept={field.type === "document" ? "application/pdf,image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,image/svg+xml"} onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setSaving(true); setError("");
                      try {
                        const files = Array.from(event.target.files ?? []);
                        const urls = await Promise.all(files.map((asset) => uploadAdminAsset(asset, table, field.type === "document" ? "documents" : "public-media")));
                        setForm((previous) => ({ ...previous, [field.key]: field.type === "images" ? JSON.stringify([...JSON.parse(String(previous[field.key] || "[]")), ...urls], null, 2) : urls[0] }));
                      } catch (uploadError) {
                        setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
                      } finally { setSaving(false); event.target.value = ""; }
                    }} className="mt-2 block w-full text-sm" />
                    {typeof value === "string" && value && field.type === "image" && <img src={value} alt="Selected upload preview" className="mt-3 h-24 w-32 rounded-lg border border-slate-200 object-cover" />}
                  </label>
                );
              }

              return (
                <label key={field.key} className="text-sm font-medium text-slate-700">
                  {field.label}
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    required={field.required}
                    value={String(value ?? "")}
                    placeholder={field.placeholder}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        [field.key]: event.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </label>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-lg bg-[#17652b] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Create item"}
          </button>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {fields.slice(0, 4).map((field) => (
                <th key={field.key} className="p-4">
                  {field.label}
                </th>
              ))}
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                {fields.slice(0, 4).map((field) => (
                  <td key={field.key} className="max-w-xs truncate p-4 text-slate-700">
                    {displayValue(row[field.key])}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(row)}
                      aria-label="Edit item"
                      className="rounded-md border border-slate-200 p-2 text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(row.id)}
                      aria-label="Delete item"
                      className="rounded-md border border-red-100 p-2 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={Math.min(fields.length, 4) + 1}
                  className="p-8 text-center text-slate-500"
                >
                  No items added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && <p className="p-5 text-sm text-slate-500">Loading…</p>}
      </div>
    </section>
  );
}
