import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

type PublicPageLayoutProps = {
  children: ReactNode;
};

export default function PublicPageLayout({ children }: PublicPageLayoutProps) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}