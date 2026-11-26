import { useState, type FormEvent } from "react";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const client = supabase;

    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      setSubmitting(false);
      return;
    }

    const { data, error: loginError } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !data.user) {
      setError(loginError?.message ?? "Login failed. Check your details.");
      setSubmitting(false);
      return;
    }

    const { data: profile, error: profileError } = await client
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      await client.auth.signOut();
      setError("This account does not have admin access.");
      setSubmitting(false);
      return;
    }

    navigate("/admin", { replace: true });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f8f2] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
      >
        <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-green-50 text-[#17652b]">
          <Leaf />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Admin login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to manage Save Eco website content.
        </p>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-700"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-700"
          />
        </label>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-lg bg-[#17652b] px-4 py-3 font-semibold text-white hover:bg-[#125322] disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}