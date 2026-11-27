import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";
import SEOHead from "../lib/seo";

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page not found"
        description="The page you are looking for could not be found."
        path="/404"
      />

      <main id="main-content" className="grid min-h-[70vh] place-items-center bg-[#f7f8f4] px-5 py-16">
        <div className="max-w-lg text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-green-100 text-[#17652b]">
            <Leaf size={30} />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-[#17652b]">
            Error 404
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Page not found
          </h1>
          <p className="mt-3 text-slate-600">
            The page may have moved or the address may be incorrect.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#17652b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#125322]"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}