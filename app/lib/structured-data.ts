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
  pageType?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  breadcrumbs?: readonly BreadcrumbItem[];
  mainEntity?: SchemaEntity;
  image?: { url: string; width: number; height: number; caption: string };
}

export const absoluteUrl = (href: string) => new URL(href, site.url).href;
export const organizationId = absoluteUrl("/#organization");

export function createPageSchema({ title, description, pathname, pageType = "WebPage", breadcrumbs = [], mainEntity, image }: PageSchemaOptions) {
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
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.localPhoneHref.replace("tel:", ""),
        email: contact.email,
        contactType: "sales",
        availableLanguage: "ru",
      },
      address: {
        "@type": "PostalAddress",
        postalCode: contact.address.postalCode,
        addressRegion: contact.address.region,
        addressLocality: `${contact.address.district}, ${contact.address.locality}`,
        streetAddress: contact.address.street,
        addressCountry: contact.address.country,
      },
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
      ...(image && { primaryImageOfPage: { "@type": "ImageObject", contentUrl: image.url, width: image.width, height: image.height, caption: image.caption } }),
      ...(["AboutPage", "ContactPage"].includes(pageType) && { about: { "@id": organizationId } }),
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
