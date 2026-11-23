import { Helmet } from "react-helmet-async";
import { siteConfig } from "./siteConfig";

type SEOHeadProps = {
  title: string;
  description: string;
  path?: string;
};

export default function SEOHead({
  title,
  description,
  path = "/",
}: SEOHeadProps) {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const pageTitle = `${title} | ${siteConfig.name}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}