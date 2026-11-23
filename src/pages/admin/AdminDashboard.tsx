import { useEffect, useState } from "react";
import { ClipboardList, Package, Users } from "lucide-react";
import { supabase } from "../../lib/supabase";

type Counts = {
  products: number;
  enquiries: number;
  partners: number;
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({
    products: 0,
    enquiries: 0,
    partners: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCounts() {
      const client = supabase;

      if (!client) {
        setError("Supabase URL ya anon key configure nahi hai.");
        setLoading(false);
        return;
      }

      const [products, enquiries, partners] = await Promise.all([
        client.from("products").select("id", { count: "exact", head: true }),
        client.from("enquiries").select("id", { count: "exact", head: true }),
        client.from("partner_leads").select("id", { count: "exact", head: true }),
      ]);

      const queryError = products.error ?? enquiries.error ?? partners.error;

      if (queryError) {
        setError(queryError.message);
      }

      setCounts({
        products: products.count ?? 0,
        enquiries: enquiries.count ?? 0,
        partners: partners.count ?? 0,
      });

      setLoading(false);
    }

    void loadCounts();
  }, []);

  const cards = [
    { label: "Products", value: counts.products, icon: Package },
    { label: "Enquiries", value: counts.enquiries, icon: ClipboardList },
    { label: "Partner leads", value: counts.partners, icon: Users },
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Overview of your Save Eco website.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <span className="rounded-lg bg-green-50 p-2 text-[#17652b]">
                <Icon size={18} />
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading ? "…" : value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}