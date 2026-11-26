import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Boxes,
  ChevronDown,
  FolderTree,
  Layers3,
  Package,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
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
  type?: "text" | "textarea" | "number" | "checkbox" | "json" | "setting-value" | "image" | "images" | "document" | "parent-category" | "product-category" | "text-array" | "dosage-application" | "dosage-dose" | "image-list";
  required?: boolean;
  defaultValue?: string | boolean;
  placeholder?: string;
};

type ResourceRow = { id: string; [key: string]: unknown };
type Props = {
  table: AdminTable;
  title: string;
  description: string;
  fields: AdminField[];
  orderBy?: string;
};
type CategoryFilter = "all" | "main" | "sub" | "with-products";

type CategoryRow = ResourceRow & {
  name_en?: string | null;
  slug?: string | null;
  parent_id?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#dfe7d9] bg-white px-3.5 py-2.5 text-sm text-[#173b25] outline-none transition placeholder:text-[#9aa497] focus:border-[#76ad3b] focus:ring-4 focus:ring-[#76ad3b]/10";

function initialForm(fields: AdminField[]) {
  return Object.fromEntries(
    fields.map((field) => [field.key, field.defaultValue ?? (field.type === "checkbox" ? false : field.type === "image-list" ? [] : "")]),
  ) as Record<string, unknown>;
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return Array.isArray(value) ? `${value.length} items` : `${Object.keys(value as Record<string, unknown>).length} values`;
  return String(value);
}

function dosagePart(value: unknown, part: "application" | "dose") {
  const entry = Array.isArray(value) ? value[0] : value;
  return entry && typeof entry === "object" && part in entry
    ? String((entry as Record<string, unknown>)[part] ?? "")
    : "";
}

export default function AdminResourcePage({ table, title, description, fields, orderBy = "created_at" }: Props) {
  const isCategories = table === "categories";
  const [rows, setRows] = useState<ResourceRow[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [categoryOptions, setCategoryOptions] = useState<CategoryRow[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(() => initialForm(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [parentFilter, setParentFilter] = useState("");
  const [formMode, setFormMode] = useState<"category" | "subcategory">("category");

  async function loadRows() {
    setLoading(true);
    const client = supabase;
    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      setLoading(false);
      return;
    }
    const db = client as unknown as { from: (tableName: AdminTable | "products") => any };
    const { data, error: loadError } = await db.from(table).select("*").order(orderBy, { ascending: orderBy === "sort_order" });
    if (loadError) {
      setError(loadError.message);
      setLoading(false);
      return;
    }
    const nextRows = (data ?? []) as ResourceRow[];
    setRows(nextRows);
    setError("");

    if (table === "products") {
      const { data: categoryData, error: categoryError } = await db.from("categories").select("id, name_en, parent_id, is_active").order("sort_order", { ascending: true });
      if (!categoryError) setCategoryOptions((categoryData ?? []) as CategoryRow[]);
    }

    if (isCategories) {
      const { data: products, error: productsError } = await db.from("products").select("category_id");
      if (!productsError) {
        const directCounts: Record<string, number> = {};
        (products ?? []).forEach((product: { category_id?: string | null }) => {
          if (product.category_id) directCounts[product.category_id] = (directCounts[product.category_id] ?? 0) + 1;
        });
        setProductCounts(directCounts);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadRows();
    // Fields are fixed by each admin resource page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy]);

  const categoryRows = rows as CategoryRow[];
  const mainCategories = categoryRows.filter((row) => !row.parent_id);
  const subCategories = categoryRows.filter((row) => Boolean(row.parent_id));
  const totalProducts = Object.values(productCounts).reduce((sum, count) => sum + count, 0);
  const visibleRows = rows.filter((row) => {
    const matchesSearch = fields.some((field) => displayValue(row[field.key]).toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase()));
    if (!matchesSearch) return false;
    if (!isCategories) return true;
    const category = row as CategoryRow;
    if (categoryFilter === "main" && category.parent_id) return false;
    if (categoryFilter === "sub" && !category.parent_id) return false;
    if (categoryFilter === "with-products" && !(productCounts[category.id] > 0)) return false;
    if (parentFilter && category.parent_id !== parentFilter) return false;
    return true;
  });

  function openNewForm(mode: "category" | "subcategory" = "category", parentId = "") {
    const nextForm = initialForm(fields);
    const parentField = fields.find((field) => field.key === "parent_id");
    if (parentField) nextForm.parent_id = parentId;
    setEditingId(null);
    setFormMode(mode);
    setForm(nextForm);
    setNotice("");
    setError("");
    setFormOpen(true);
  }

  function openEditForm(row: ResourceRow) {
    const nextForm: Record<string, unknown> = {};
    fields.forEach((field) => {
      const value = field.type === "dosage-application" || field.type === "dosage-dose" ? row.dosage : row[field.key];
      if (field.type === "setting-value") {
        const structured = value !== null && typeof value === "object";
        nextForm[field.key] = structured ? "" : value ?? "";
        nextForm._setting_value_original = value;
        nextForm._setting_value_dirty = false;
        nextForm._setting_value_structured = structured;
      } else if (field.type === "json" || field.type === "images") nextForm[field.key] = value == null ? String(field.defaultValue ?? "[]") : JSON.stringify(value, null, 2);
      else if (field.type === "text-array") nextForm[field.key] = Array.isArray(value) ? value.join("\n") : String(value ?? "");
      else if (field.type === "dosage-application" || field.type === "dosage-dose") nextForm[field.key] = dosagePart(value, field.type === "dosage-application" ? "application" : "dose");
      else if (field.type === "image-list") nextForm[field.key] = Array.isArray(value) ? value.filter((url): url is string => typeof url === "string") : [];
      else nextForm[field.key] = value ?? field.defaultValue ?? (field.type === "checkbox" ? false : "");
      if (field.type === "product-category" && value) {
        const selected = categoryOptions.find((category) => category.id === value);
        nextForm._main_category_id = selected?.parent_id || selected?.id || "";
      }
    });
    setEditingId(row.id);
    setFormMode(row.parent_id ? "subcategory" : "category");
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
      setError("Supabase is not configured. Add the project URL and anon key.");
      setSaving(false);
      return;
    }
    const payload: Record<string, unknown> = {};
    try {
      fields.forEach((field) => {
        const value = form[field.key];
        if (field.type === "setting-value") {
          const changed = form._setting_value_dirty === true;
          payload[field.key] = !changed && form._setting_value_original !== undefined
            ? form._setting_value_original
            : String(value ?? "");
        } else if (field.type === "json" || field.type === "images") payload[field.key] = JSON.parse(String(value || "[]"));
        else if (field.type === "text-array") payload[field.key] = String(value ?? "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
        else if (field.type === "dosage-application" || field.type === "dosage-dose") return;
        else if (field.type === "image-list") payload[field.key] = Array.isArray(value) ? value : [];
        else if (field.type === "number") payload[field.key] = value === "" || value === null ? null : Number(value);
        else if (field.type === "checkbox") payload[field.key] = Boolean(value);
        else payload[field.key] = value === "" || value === undefined ? null : value;
      });
      if (table === "products") {
        const application = String(form.dosage_application ?? "").trim();
        const dose = String(form.dosage_dose ?? "").trim();
        payload.dosage = application || dose ? [{ application, dose }] : [];
      }
    } catch {
      setError("Please check the value format and try again.");
      setSaving(false);
      return;
    }
    const db = client as unknown as { from: (tableName: AdminTable) => any };
    const result = editingId ? await db.from(table).update(payload).eq("id", editingId) : await db.from(table).insert(payload);
    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }
    setNotice(editingId ? "Changes saved." : formMode === "subcategory" ? "Subcategory added." : "Category added.");
    setFormOpen(false);
    setEditingId(null);
    setSaving(false);
    await loadRows();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const client = supabase;
    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      return;
    }
    const db = client as unknown as { from: (tableName: AdminTable) => any };
    const { error: deleteError } = await db.from(table).delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setNotice("Item deleted.");
    await loadRows();
  }

  const parentName = (id: unknown) => categoryRows.find((item) => item.id === id)?.name_en || "Main category";
  const productCategoryName = (id: unknown) => {
    const selected = categoryOptions.find((category) => category.id === id);
    if (!selected) return displayValue(id);
    const parent = selected.parent_id ? categoryOptions.find((category) => category.id === selected.parent_id) : null;
    return parent ? String(parent.name_en) + " / " + String(selected.name_en) : String(selected.name_en || "Main category");
  };
  const categoryCountFor = (category: CategoryRow) => {
    const direct = productCounts[category.id] ?? 0;
    if (category.parent_id) return direct;
    const children = subCategories.filter((child) => child.parent_id === category.id);
    return direct + children.reduce((sum, child) => sum + (productCounts[child.id] ?? 0), 0);
  };

  return (
    <section className="font-body text-[#173b25]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#77936a]">Save Eco Organic · Admin</p>
          <h1 className="font-heading text-3xl font-semibold tracking-[-.035em] text-[#153b25] sm:text-[2.15rem]">{title}</h1>
          <p className="mt-1.5 text-sm text-[#718071]">{description}</p>
        </div>
        {isCategories ? (
          <div className="flex flex-wrap gap-2">
            <a href="/admin/products" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#dce7d5] bg-white px-4 text-sm font-bold text-[#31563a] transition hover:-translate-y-0.5 hover:bg-[#f5f9f0]"><Package size={16} /> Products <ArrowRight size={14} /></a>
            <button type="button" onClick={() => openNewForm("subcategory")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#bcd7aa] bg-[#f4f8ed] px-4 text-sm font-bold text-[#315b32] transition hover:-translate-y-0.5 hover:bg-[#eaf3df]"><FolderTree size={16} /> Add subcategory</button>
            <button type="button" onClick={() => openNewForm("category")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#17652b] px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(23,101,43,.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#125322]"><Plus size={17} /> Add category</button>
          </div>
        ) : (
          <button type="button" onClick={() => openNewForm()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#17652b] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(23,101,43,.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#125322]"><Plus size={17} /> Add new</button>
        )}
      </header>

      {error && !formOpen && <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {notice && <p className="mt-5 rounded-2xl border border-[#d8e9ca] bg-[#f0f7e9] px-4 py-3 text-sm text-[#285c2d]">{notice}</p>}

      {isCategories && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Main categories", value: mainCategories.length, icon: Boxes, tint: "bg-[#eff6e8] text-[#3c7c35]" },
            { label: "Subcategories", value: subCategories.length, icon: Layers3, tint: "bg-[#f5f1e5] text-[#9a7a2d]" },
            { label: "Products assigned", value: totalProducts, icon: Package, tint: "bg-[#edf4f1] text-[#32705a]" },
          ].map((metric) => <div key={metric.label} className="group flex items-center gap-3 rounded-2xl border border-[#e2eadc] bg-white/90 p-4 shadow-[0_8px_24px_rgba(25,60,35,.035)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(25,60,35,.08)]"><span className={`grid size-10 place-items-center rounded-xl ${metric.tint}`}><metric.icon size={18} /></span><div><p className="text-xs font-semibold text-[#7d8a79]">{metric.label}</p><p className="font-heading text-xl font-semibold text-[#173b25]">{loading ? "…" : metric.value}</p></div></div>)}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102d1d]/45 p-3 backdrop-blur-sm sm:p-6">
          <form onSubmit={handleSave} role="dialog" aria-modal="true" aria-labelledby="admin-resource-form-title" className="flex max-h-[92vh] w-full max-w-[1080px] flex-col overflow-hidden rounded-[1.6rem] border border-white/80 bg-[#fffef9] shadow-[0_30px_100px_rgba(10,35,18,.3)] sm:rounded-[2rem]">
            <div className="flex items-center justify-between gap-4 border-b border-[#e6eadf] bg-gradient-to-r from-[#f6faef] to-white px-5 py-4 sm:px-7 sm:py-5"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#6f963e]">{editingId ? "Update information" : "Create new entry"}</p><h2 id="admin-resource-form-title" className="mt-1 font-heading text-xl font-semibold text-[#153b25] sm:text-2xl">{editingId ? "Edit item" : isCategories ? formMode === "subcategory" ? "Add subcategory" : "Add category" : table === "products" ? "Add product" : "Add item"}</h2></div><button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="grid size-10 shrink-0 place-items-center rounded-full border border-[#e4e9df] bg-white text-[#56705a] transition hover:rotate-90 hover:border-[#b7d59a] hover:bg-[#f2f7eb]"><X size={19} /></button></div>
            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">{error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              {fields.map((field) => {
                const value = form[field.key];
                const fieldLabel = <>{field.label}{field.required && <span className="text-[#b94b3c"> *</span>}</>;
                if (field.type === "checkbox") return <label key={field.key} className="flex min-h-12 items-center gap-3 rounded-xl border border-[#e5eadf] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#405744] transition hover:border-[#b8d39a] hover:bg-[#f8fbf4]"><input type="checkbox" checked={Boolean(value)} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.checked }))} className="size-4 accent-[#4abd00]" />{field.label}</label>;
                if (field.type === "product-category") {
                  const mainId = String(form._main_category_id ?? "");
                  const mainOptions = categoryOptions.filter((category) => !category.parent_id && category.is_active !== false);
                  const subOptions = categoryOptions.filter((category) => category.parent_id === mainId && category.is_active !== false);
                  const selectedCategory = categoryOptions.find((category) => category.id === value);
                  const selectedIsSubcategory = Boolean(selectedCategory?.parent_id);
                  return <div key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250] sm:col-span-2"><span>{fieldLabel}</span><div className="mt-1.5 grid gap-3 sm:grid-cols-2"><label className="block"><span className="text-[11px] font-semibold text-[#718071]">1. Main category</span><span className="relative block"><select required={!value} value={mainId} onChange={(event) => setForm((previous) => ({ ...previous, _main_category_id: event.target.value, [field.key]: event.target.value }))} className={inputClass + " appearance-none pr-10"}><option value="">Choose a main category</option>{mainOptions.map((category) => <option key={category.id} value={category.id}>{category.name_en || "Unnamed category"}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#809078]" /></span></label><label className="block"><span className="text-[11px] font-semibold text-[#718071]">2. Subcategory (optional)</span><span className="relative block"><select disabled={!mainId || subOptions.length === 0} value={selectedIsSubcategory ? String(value ?? "") : ""} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value || mainId }))} className={inputClass + " appearance-none pr-10 disabled:cursor-not-allowed disabled:bg-[#f3f5f0] disabled:text-[#98a195]"}><option value="">{!mainId ? "Select main category first" : subOptions.length ? "Use main category" : "No subcategories available"}</option>{subOptions.map((category) => <option key={category.id} value={category.id}>{category.name_en || "Unnamed subcategory"}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#809078]" /></span></label></div><span className="mt-1.5 block text-[11px] font-normal text-[#849082]">First choose a main category. Then select one of its subcategories, if applicable.</span></div>;
                }

                if (field.type === "setting-value") return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250]">{fieldLabel}<input type="text" required={field.required} value={String(value ?? "")} placeholder={field.placeholder || "Enter a text value"} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value, _setting_value_dirty: true }))} className={inputClass} /><span className="mt-1.5 block text-[11px] font-normal text-[#849082]">Enter plain text, a number, URL, or email. No JSON formatting is needed.{form._setting_value_structured ? " The existing structured value will be preserved unless you enter a replacement." : ""}</span></label>;

                if (field.type === "text-array") return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250]">{fieldLabel}<textarea rows={3} value={String(value ?? "")} placeholder="Enter one item per line" onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} /><span className="mt-1.5 block text-[11px] font-normal text-[#849082]">Enter one item per line. No special formatting is required.</span></label>;

                if (field.type === "dosage-application" || field.type === "dosage-dose") return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250]">{fieldLabel}<input type="text" value={String(value ?? "")} placeholder={field.placeholder} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} /></label>;

                if (field.type === "image-list") {
                  const imageUrls = Array.isArray(value) ? value.filter((url): url is string => typeof url === "string") : [];
                  return <div key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250] sm:col-span-2"><span>{fieldLabel}</span><p className="mt-1.5 text-[11px] font-normal text-[#849082]">Choose photos from your computer. They upload to the website and are saved with this product.</p><input type="file" multiple accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={async (event) => { if (!event.target.files?.length) return; setSaving(true); setError(""); try { const files = Array.from(event.target.files); const uploadedUrls = await Promise.all(files.map((asset) => uploadAdminAsset(asset, table, "public-media"))); setForm((previous) => ({ ...previous, [field.key]: [...(Array.isArray(previous[field.key]) ? previous[field.key] as string[] : []), ...uploadedUrls] })); } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "Image upload failed."); } finally { setSaving(false); event.target.value = ""; } }} className="mt-2 block w-full rounded-xl border border-dashed border-[#cbd9c1] bg-[#f8fbf4] p-3 text-xs text-[#60705d] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8f2dc] file:px-3 file:py-1.5 file:font-bold file:text-[#326d2c]" />{imageUrls.length > 0 && <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{imageUrls.map((url, index) => <figure key={url + index} className="group relative overflow-hidden rounded-xl border border-[#e1e8dc] bg-white"><img src={url} alt={"Product photo " + (index + 1)} className="h-24 w-full object-cover" /><button type="button" onClick={() => setForm((previous) => ({ ...previous, [field.key]: (Array.isArray(previous[field.key]) ? previous[field.key] as string[] : []).filter((_, imageIndex) => imageIndex !== index) }))} aria-label={"Remove product image " + (index + 1)} className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-white/95 text-[#a63b32] shadow transition hover:bg-red-50"><X size={14} /></button></figure>)}</div>}</div>;
                }

                if (field.type === "parent-category") return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250]">{fieldLabel}<span className="relative block"><select required={field.required} value={String(value ?? "")} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={`${inputClass} appearance-none pr-10`}><option value="">{formMode === "subcategory" ? "Choose the parent category" : "Main category (no parent)"}</option>{mainCategories.filter((category) => category.id !== editingId).map((category) => <option key={category.id} value={category.id}>{category.name_en || "Unnamed category"}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#809078]" /></span><span className="mt-1.5 block text-[11px] font-normal text-[#849082]">{formMode === "subcategory" ? "Choose which main category this subcategory belongs to." : "Leave blank to create a main category."}</span></label>;
                if (field.type === "textarea" || field.type === "json") return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250]">{fieldLabel}<textarea required={field.required} rows={3} value={String(value ?? "")} placeholder={field.placeholder} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} />{field.type === "json" && <span className="mt-1.5 block text-[11px] font-normal text-[#849082]">Enter a valid JSON value.</span>}</label>;
                if (field.type === "image" || field.type === "images" || field.type === "document") return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250] sm:col-span-2">{fieldLabel}{field.type === "images" && <textarea rows={3} value={String(value ?? "[]")} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} aria-label="Product image URL JSON array" />}{field.type !== "images" && <input type="url" required={field.required} value={String(value ?? "")} placeholder="https://…" onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} />}<span className="mt-2 block text-[11px] font-normal text-[#849082]">Upload file, or paste a URL{field.type === "images" ? "; uploaded images are added to the JSON list" : ""}.</span><input type="file" multiple={field.type === "images"} accept={field.type === "document" ? "application/pdf,image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,image/svg+xml"} onChange={async (event) => { if (!event.target.files?.length) return; setSaving(true); setError(""); try { const files = Array.from(event.target.files); const urls = await Promise.all(files.map((asset) => uploadAdminAsset(asset, table, field.type === "document" ? "documents" : "public-media"))); setForm((previous) => ({ ...previous, [field.key]: field.type === "images" ? JSON.stringify([...JSON.parse(String(previous[field.key] || "[]")), ...urls], null, 2) : urls[0] })); } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "Upload failed."); } finally { setSaving(false); event.target.value = ""; } }} className="mt-2 block w-full rounded-xl border border-dashed border-[#cbd9c1] bg-[#f8fbf4] p-3 text-xs text-[#60705d] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8f2dc] file:px-3 file:py-1.5 file:font-bold file:text-[#326d2c]" />{typeof value === "string" && value && field.type === "image" && <img src={value} alt="Selected upload preview" className="mt-3 h-24 w-32 rounded-lg border border-[#dfe7d9] object-cover" />}</label>;
                return <label key={field.key} className="text-xs font-bold tracking-[.01em] text-[#4d6250]">{fieldLabel}<input type={field.type === "number" ? "number" : "text"} required={field.required} value={String(value ?? "")} placeholder={field.placeholder} onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))} className={inputClass} /></label>;
              })}
            </div></div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e6eadf] bg-[#fffef9] px-5 py-4 sm:px-7"><p className="text-xs text-[#829080]">Complete the required fields before saving.</p><button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4abd00] px-6 text-sm font-extrabold text-[#143b20] shadow-[0_8px_18px_rgba(74,189,0,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#63c92a] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving…" : editingId ? "Save changes" : isCategories ? formMode === "subcategory" ? "Create subcategory" : "Create category" : table === "products" ? "Create product" : "Create item"}</button></div>
          </form>
        </div>
      )}

      <div className="admin-dashboard-panel mt-6 overflow-hidden rounded-[1.4rem] border border-[#e1e8dc] bg-white shadow-[0_12px_36px_rgba(27,58,34,.055)] sm:mt-7 sm:rounded-[1.7rem]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0e9] px-4 py-4 sm:px-5"><div><h2 className="font-heading text-lg font-semibold text-[#153b25]">Your {title.toLocaleLowerCase()}</h2><p className="mt-0.5 text-xs text-[#849082]">{loading ? "Loading entries…" : `${visibleRows.length} shown · ${rows.length} total`}</p></div><label className="relative block w-full sm:max-w-[300px]"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#82917c]" aria-hidden="true" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={`Search ${title.toLocaleLowerCase()}…`} className="min-h-10 w-full rounded-full border border-[#e1e8dc] bg-[#fbfcf8] pl-9 pr-4 text-sm text-[#173b25] outline-none transition placeholder:text-[#9aa497] focus:border-[#91bc65] focus:ring-4 focus:ring-[#91bc65]/10" /></label></div>
        {isCategories && <div className="flex flex-wrap items-center gap-2 border-b border-[#edf0e9] bg-[#fcfdf9] px-4 py-3 sm:px-5"><div className="flex flex-wrap gap-1.5">{([{ id: "all", label: "All" }, { id: "main", label: "Main categories" }, { id: "sub", label: "Subcategories" }, { id: "with-products", label: "With products" }] as { id: CategoryFilter; label: string }[]).map((filter) => <button key={filter.id} type="button" onClick={() => { setCategoryFilter(filter.id); if (filter.id !== "sub") setParentFilter(""); }} className={`rounded-full px-3.5 py-2 text-xs font-bold transition duration-200 ${categoryFilter === filter.id ? "bg-[#e9f3df] text-[#28642f] shadow-inner" : "text-[#718071] hover:bg-[#f0f5eb] hover:text-[#31583a]"}`}>{filter.label}</button>)}</div><label className="relative ml-auto min-w-[190px]"><select value={parentFilter} onChange={(event) => { setParentFilter(event.target.value); if (event.target.value) setCategoryFilter("sub"); }} className="min-h-9 w-full appearance-none rounded-full border border-[#e1e8dc] bg-white pl-3.5 pr-9 text-xs font-semibold text-[#536854] outline-none transition focus:border-[#91bc65]"><option value="">All parent categories</option>{mainCategories.map((category) => <option key={category.id} value={category.id}>{category.name_en || "Unnamed category"}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#82917c]" /></label></div>}
        <div className="overflow-x-auto"><table className={`w-full text-left text-sm ${isCategories ? "min-w-[850px]" : "min-w-[700px]"}`}><thead className="bg-[#f6f8f1] text-[11px] font-extrabold uppercase tracking-[.1em] text-[#73836d]"><tr>{isCategories ? <><th className="px-4 py-3.5 sm:px-5">Category name</th><th className="px-4 py-3.5 sm:px-5">URL slug</th><th className="px-4 py-3.5 sm:px-5">Type / parent</th><th className="px-4 py-3.5 sm:px-5">Products</th><th className="px-4 py-3.5 sm:px-5">Status</th></> : fields.slice(0, 4).map((field) => <th key={field.key} className="px-4 py-3.5 sm:px-5">{field.label}</th>)}<th className="px-4 py-3.5 sm:px-5">Actions</th></tr></thead><tbody>
          {visibleRows.map((row, index) => isCategories ? <tr key={row.id} style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }} className="animate-[fadeInUp_.35s_ease_both] border-t border-[#edf0e9] transition-colors hover:bg-[#fbfcf8]"><td className="px-4 py-3.5 sm:px-5"><div className="flex items-center gap-3"><span className={`grid size-9 shrink-0 place-items-center rounded-xl ${row.parent_id ? "bg-[#f3f6eb] text-[#789146]" : "bg-[#eaf3e2] text-[#38763a]"}`}>{row.parent_id ? <Layers3 size={16} /> : <FolderTree size={16} />}</span><div><p className="font-semibold text-[#334b37]">{String(row.name_en || "Unnamed category")}</p><p className="text-xs text-[#98a195]">{row.parent_id ? "Subcategory" : "Main category"}</p></div></div></td><td className="px-4 py-3.5 text-[#687968] sm:px-5">{displayValue(row.slug)}</td><td className="px-4 py-3.5 sm:px-5">{row.parent_id ? <span className="inline-flex items-center rounded-full bg-[#f7f5ec] px-2.5 py-1 text-xs font-medium text-[#746b4b]">↳ {parentName(row.parent_id)}</span> : <span className="inline-flex items-center rounded-full bg-[#eff6e9] px-2.5 py-1 text-xs font-semibold text-[#477541]">Main category</span>}</td><td className="px-4 py-3.5 sm:px-5"><span className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#f4f7f0] px-2.5 py-1 text-xs font-bold text-[#526951]">{categoryCountFor(row as CategoryRow)}</span></td><td className="px-4 py-3.5 sm:px-5"><span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${row.is_active === false ? "text-[#9a8274]" : "text-[#4d8545]"}`}><span className={`size-1.5 rounded-full ${row.is_active === false ? "bg-[#c1a89a]" : "bg-[#63b64a]"}`} />{row.is_active === false ? "Hidden" : "Visible"}</span></td><td className="px-4 py-3.5 sm:px-5"><div className="flex items-center gap-1.5"><button type="button" onClick={() => openNewForm("subcategory", row.parent_id ? String(row.parent_id) : row.id)} title="Add a subcategory under this category" aria-label={`Add subcategory under ${String(row.name_en || "category")}`} className="grid size-9 place-items-center rounded-xl border border-[#e2e9de] text-[#6f8c55] transition hover:-translate-y-0.5 hover:border-[#9fc778] hover:bg-[#f2f8eb]"><Plus size={15} /></button><button type="button" onClick={() => openEditForm(row)} aria-label="Edit item" className="grid size-9 place-items-center rounded-xl border border-[#e2e9de] text-[#426447] transition hover:-translate-y-0.5 hover:border-[#9fc778] hover:bg-[#f2f8eb]"><Pencil size={15} /></button><button type="button" onClick={() => void handleDelete(row.id)} aria-label="Delete item" className="grid size-9 place-items-center rounded-xl border border-red-100 text-red-600 transition hover:-translate-y-0.5 hover:bg-red-50"><Trash2 size={15} /></button></div></td></tr> : <tr key={row.id} className="border-t border-[#edf0e9] transition-colors hover:bg-[#fbfcf8]">{fields.slice(0, 4).map((field) => <td key={field.key} className="max-w-xs truncate px-4 py-4 text-[#435644] sm:px-5">{table === "products" && field.key === "category_id" ? productCategoryName(row[field.key]) : displayValue(row[field.key])}</td>)}<td className="px-4 py-3.5 sm:px-5"><div className="flex gap-2"><button type="button" onClick={() => openEditForm(row)} aria-label="Edit item" className="grid size-9 place-items-center rounded-xl border border-[#e2e9de] text-[#426447] transition hover:-translate-y-0.5 hover:border-[#9fc778] hover:bg-[#f2f8eb]"><Pencil size={15} /></button><button type="button" onClick={() => void handleDelete(row.id)} aria-label="Delete item" className="grid size-9 place-items-center rounded-xl border border-red-100 text-red-600 transition hover:-translate-y-0.5 hover:bg-red-50"><Trash2 size={15} /></button></div></td></tr>)}
          {!loading && visibleRows.length === 0 && <tr><td colSpan={isCategories ? 6 : Math.min(fields.length, 4) + 1} className="px-5 py-12 text-center text-sm text-[#829080]">{searchTerm ? `No ${title.toLocaleLowerCase()} match “${searchTerm}”.` : isCategories && categoryFilter === "with-products" ? "No categories with assigned products were found." : `No ${title.toLocaleLowerCase()} added yet.`}</td></tr>}
        </tbody></table></div>{loading && <p className="px-5 py-5 text-sm text-[#829080]">Loading…</p>}
      </div>
      {isCategories && <div className="mt-3 flex items-start gap-2 px-1 text-xs leading-5 text-[#829080]"><Sparkles size={14} className="mt-0.5 shrink-0 text-[#84a95c]" /><p>Use the <strong className="font-semibold text-[#5d7158]">＋</strong> on a category row to add a subcategory directly under it. Use <strong className="font-semibold text-[#5d7158]">Products</strong> to open product management and assign products to a category or subcategory.</p></div>}
    </section>
  );
}
