import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

type PublicPageLayoutProps = {
  children: ReactNode;
};

function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default function PublicPageLayout({ children }: PublicPageLayoutProps) {
  return (
    <>
      <RouteScroll />
      <TopBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
