import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Enquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};

export default function EnquiryLeads() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadItems() {
    setLoading(true);

    const client = supabase;

    if (!client) {
      setError("Supabase URL ya anon key configure nahi hai.");
      setLoading(false);
      return;
    }

    const { data, error: loadError } = await client
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
    } else {
      setError("");
      setItems((data ?? []) as Enquiry[]);
    }

    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const client = supabase;

    if (!client) {
      setError("Supabase URL ya anon key configure nahi hai.");
      return;
    }

    const { error: updateError } = await client
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
    } else {
      await loadItems();
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
      <p className="mt-1 text-sm text-slate-500">
        Contact form submissions.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-100 align-top">
                <td className="p-4 font-medium text-slate-900">{item.name}</td>
                <td className="p-4 text-slate-600">
                  <div>{item.phone}</div>
                  <div>{item.email ?? "No email"}</div>
                </td>
                <td className="max-w-xs p-4 text-slate-600">
                  {item.subject && <strong>{item.subject}: </strong>}
                  {item.message}
                </td>
                <td className="whitespace-nowrap p-4 text-slate-600">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <select
                    value={item.status}
                    onChange={(event) =>
                      void updateStatus(item.id, event.target.value)
                    }
                    className="rounded-md border border-slate-300 px-2 py-1.5"
                    aria-label={`Status for ${item.name}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && (
          <p className="p-5 text-sm text-slate-500">Loading enquiries…</p>
        )}
      </div>
    </section>
  );
}