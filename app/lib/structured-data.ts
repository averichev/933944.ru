import { contact, site } from "../content/site";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SchemaEntity {
  "@type": string;
  "@id": string;
  [property: string]: unknown;
}

interface PageSchemaOptions {
  title: string;
  description: string;
  pathname: string;
  pageType?: "WebPage" | "CollectionPage" | "AboutPage";
  breadcrumbs?: readonly BreadcrumbItem[];
  mainEntity?: SchemaEntity;
}

export const absoluteUrl = (href: string) => new URL(href, site.url).href;
export const organizationId = absoluteUrl("/#organization");

export function createPageSchema({ title, description, pathname, pageType = "WebPage", breadcrumbs = [], mainEntity }: PageSchemaOptions) {
  const url = absoluteUrl(pathname);
  const websiteId = absoluteUrl("/#website");
  const breadcrumbId = `${url}#breadcrumbs`;
  const graph: SchemaEntity[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      description: site.description,
      url: site.url,
      logo: absoluteUrl("/images/isvo-horizontal.svg"),
      telephone: contact.phoneHref.replace("tel:", ""),
      email: contact.email,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: site.name,
      url: site.url,
      inLanguage: "ru-RU",
      publisher: { "@id": organizationId },
    },
    {
      "@type": pageType,
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "ru-RU",
      isPartOf: { "@id": websiteId },
      publisher: { "@id": organizationId },
      ...(breadcrumbs.length > 1 && { breadcrumb: { "@id": breadcrumbId } }),
      ...(mainEntity && { mainEntity: { "@id": mainEntity["@id"] } }),
    },
  ];

  if (breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: absoluteUrl(item.href),
      })),
    });
  }
  if (mainEntity) graph.push(mainEntity);

  return { "@context": "https://schema.org", "@graph": graph };
}

// JSON-LD is embedded in a raw-text HTML element. Escape '<' so content cannot
// terminate the script, even if future catalog text contains '</script>'.
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
