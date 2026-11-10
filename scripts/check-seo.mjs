import assert from "node:assert/strict";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { parse } from "parse5";

// Inspect the generated HTML, rather than trusting the source templates.
// SEO_ORIGIN=https://933944.ru also checks delivery after deployment.
const root = resolve("dist");
const output = resolve("outputs/seo");
const report = { pages: [], errors: [], delivery: [] };
const files = new Map();
const documents = new Map();
const titles = new Set();
const descriptions = new Set();

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else files.set("/" + relative(root, file).split(sep).join("/"), file);
  }
}
function nodes(node) {
  return [node, ...(node.childNodes ?? []).flatMap(nodes)];
}
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const text = node => (node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join(" ")).replace(/\s+/g, " ").trim();
const hasClass = (node, name) => (attr(node, "class") ?? "").split(/\s+/).includes(name);
const tag = (all, name) => all.filter(node => node.tagName === name);
function one(items, label) {
  assert.equal(items.length, 1, `${label}: expected one, got ${items.length}`);
  return items[0];
}
function meta(all, name) {
  return attr(one(tag(all, "meta").filter(node => attr(node, "name") === name || attr(node, "property") === name), name), "content");
}
async function documentFor(file) {
  if (!documents.has(file)) documents.set(file, nodes(parse(await readFile(file, "utf8"))));
  return documents.get(file);
}
function fileFor(url) {
  const path = decodeURIComponent(url.pathname);
  return files.get(path.endsWith("/") ? path + "index.html" : path);
}
function locations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replace(/&amp;/g, "&"));
}
await walk(root);
const html = [...files].filter(([path]) => path.endsWith(".html"));
assert(html.length > 0, "Build the site first: make build");
let publicOrigin;
for (const [path, file] of html) {
  const route = path.replace(/index\.html$/, "");
  try {
    const all = await documentFor(file);
    const title = text(one(tag(all, "title"), "title"));
    const description = meta(all, "description");
    const h1 = text(one(tag(all, "h1"), "H1"));
    assert(title && description && h1, "Title, description and H1 must have content");
    assert.equal(attr(one(tag(all, "html"), "html"), "lang"), "ru");
    one(tag(all, "main"), "main");
    const ids = all.map(node => attr(node, "id")).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, "Duplicate HTML IDs");
    const noindex = /\bnoindex\b/.test(meta(all, "robots"));
    assert.equal(noindex, route === "/404.html", "Only the error page should be noindex");
    for (const image of tag(all, "img")) assert(attr(image, "alt") !== undefined, "Image without alt");
    const canonicalLinks = tag(all, "link").filter(node => attr(node, "rel") === "canonical");
    if (noindex) {
      assert.equal(canonicalLinks.length, 0, "The 404 must not canonicalize to an indexable page");
      continue;
    }
    const canonical = attr(one(canonicalLinks, "canonical"), "href");
    const url = new URL(canonical);
    publicOrigin ??= url.origin;
    assert.equal(url.protocol, "https:");
    assert.equal(url.origin, publicOrigin);
    assert.equal(url.pathname, route);
    assert(!url.search && !url.hash, "Canonical must not contain parameters or fragments");
    assert(!titles.has(title), `Duplicate title: ${title}`);
    assert(!descriptions.has(description), `Duplicate description: ${description}`);
    titles.add(title);
    descriptions.add(description);
    assert.equal(meta(all, "og:title"), title);
    assert.equal(meta(all, "og:description"), description);
    assert.equal(meta(all, "og:url"), canonical);
    assert.equal(meta(all, "og:locale"), "ru_RU");
    assert.equal(meta(all, "twitter:title"), title);
    assert.equal(meta(all, "twitter:description"), description);
    assert.equal(meta(all, "twitter:card"), "summary_large_image");
    const image = new URL(meta(all, "og:image"));
    assert.equal(image.origin, publicOrigin);
    assert.equal(meta(all, "twitter:image"), image.href);
    assert.equal(meta(all, "og:image:type"), "image/jpeg");
    assert(+meta(all, "og:image:width") > 0 && +meta(all, "og:image:height") > 0);
    assert(meta(all, "og:image:alt"));
    const imageFile = fileFor(image);
    assert(imageFile, `Missing preview image: ${image.pathname}`);
    assert.equal((await readFile(imageFile)).subarray(0, 3).toString("hex"), "ffd8ff", "Preview must be a real JPEG");
    const script = one(tag(all, "script").filter(node => attr(node, "type") === "application/ld+json"), "JSON-LD");
    const graph = JSON.parse(script.childNodes.map(node => node.value ?? "").join(""))["@graph"];
    const page = one(graph.filter(item => item["@id"] === `${canonical}#webpage`), "WebPage schema");
    assert.equal(page.url, canonical);
    assert.equal(page.name, title);
    assert.equal(page.description, description);
    assert.equal(page.primaryImageOfPage.contentUrl, image.href);
    assert.equal(new Set(graph.map(item => item["@id"])).size, graph.length, "Duplicate JSON-LD IDs");
    const product = graph.find(item => item["@type"] === "Product");
    if (product) {
      assert.equal(product.name.replace(/ — /, " "), h1);
      assert(fileFor(new URL(product.image)), "Missing Product image");
      const table = one(all.filter(node => hasClass(node, "product-specifications")), "Specifications table");
      const specs = tag(nodes(table), "tr").map(row => ({ name: text(one(tag(nodes(row), "th"), "spec name")), value: text(one(tag(nodes(row), "td"), "spec value")) }));
      assert.deepEqual(product.additionalProperty.map(({ name, value }) => ({ name, value })), specs, "Schema must match visible specifications");
    }
    const crumbs = graph.find(item => item["@type"] === "BreadcrumbList");
    if (route !== "/") {
      assert(crumbs, "Internal page needs breadcrumbs");
      const nav = one(all.filter(node => hasClass(node, "breadcrumbs")), "Visible breadcrumbs");
      const visible = tag(nodes(nav), "li").map(li => {
        const label = one(nodes(li).filter(node => node.tagName === "a" || attr(node, "aria-current") === "page"), "breadcrumb label");
        return { name: text(label), item: new URL(attr(label, "href") ?? route, publicOrigin).href };
      });
      assert.deepEqual(crumbs.itemListElement.map(({ name, item }) => ({ name, item })), visible);
    }
    report.pages.push({ route, title, description, h1, canonical, image: image.href });
  } catch (error) {
    report.errors.push(`${route}: ${error.message}`);
  }
}

// Check every local resource and link, including fragments on other pages.
for (const [path, file] of html) {
  const route = path.replace(/index\.html$/, "");
  for (const node of await documentFor(file)) {
    const refs = [attr(node, "href"), attr(node, "src"), ...(attr(node, "srcset") ?? "").split(",").map(part => part.trim().split(/\s+/)[0])].filter(Boolean);
    for (const ref of refs) {
      try {
        const url = new URL(ref, publicOrigin + route);
        if (url.origin !== publicOrigin) continue;
        const target = fileFor(url);
        assert(target, `Broken local link/resource: ${ref}`);
        if (url.hash && target.endsWith(".html")) {
          const targetNodes = await documentFor(target);
          assert(targetNodes.some(item => attr(item, "id") === decodeURIComponent(url.hash.slice(1))), `Missing fragment: ${ref}`);
        }
      } catch (error) { report.errors.push(`${route}: ${error.message}`); }
    }
  }
}

try {
  const index = await readFile(resolve(root, "sitemap-index.xml"), "utf8");
  const sitemaps = locations(index);
  assert(sitemaps.length > 0, "Empty sitemap index");
  const urls = [];
  for (const sitemap of sitemaps) {
    const url = new URL(sitemap);
    assert.equal(url.origin, publicOrigin);
    const body = await readFile(fileFor(url), "utf8");
    urls.push(...locations(body));
  }
  assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
  assert.deepEqual(urls.sort(), report.pages.map(page => page.canonical).sort(), "Sitemap must include every indexable page and exclude the 404");
  const robots = await readFile(resolve(root, "robots.txt"), "utf8");
  assert(robots.includes(`Sitemap: ${publicOrigin}/sitemap-index.xml`));
  assert(/^User-agent: \*$/m.test(robots) && /^Allow: \/$/m.test(robots));
  assert(!/^Disallow:\s*\/\s*$/m.test(robots), "Site is blocked in robots.txt");
  report.sitemapPages = urls.length;
} catch (error) { report.errors.push(`Sitemap/robots: ${error.message}`); }

if (process.env.SEO_ORIGIN) {
  const target = new URL(process.env.SEO_ORIGIN);
  assert(["http:", "https:"].includes(target.protocol));
  const fetchPath = path => fetch(new URL(path, target), { redirect: "manual", signal: AbortSignal.timeout(20_000) });
  async function delivery(path, check) {
    try {
      const response = await fetchPath(path);
      await check(response);
      report.delivery.push({ path, status: response.status });
    } catch (error) { report.errors.push(`HTTP ${path}: ${error.message}`); }
  }
  for (const page of report.pages) await delivery(page.route, async response => {
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/);
    const all = nodes(parse(await response.text()));
    assert.equal(text(one(tag(all, "title"), "deployed title")), page.title, "Deployed HTML differs from the build");
    assert.equal(meta(all, "description"), page.description);
    assert.equal(meta(all, "og:url"), page.canonical);
  });
  for (const path of ["/robots.txt", "/sitemap-index.xml", "/sitemap-0.xml"]) await delivery(path, async response => {
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", path.endsWith(".xml") ? /(?:application|text)\/xml/ : /text\/plain/);
    assert.equal((await response.text()).trim(), (await readFile(resolve(root, path.slice(1)), "utf8")).trim());
  });
  for (const path of ["/seo-check-missing-page/", "/assets/seo-check-missing.jpg", "/sitemap-9999.xml"]) await delivery(path, async response => {
    assert.equal(response.status, 404, "Missing URL must return a real 404");
    assert.match(await response.text(), /noindex/);
  });
  for (const path of ["/index.html?seo_check=1", "/about/index.html?seo_check=1", "/about?seo_check=1"]) await delivery(path, response => {
    assert([301, 308].includes(response.status), "Duplicate URL needs a permanent redirect");
    const redirect = new URL(response.headers.get("location"), target);
    assert.equal(redirect.pathname, path.startsWith("/about") ? "/about/" : "/");
    assert.equal(redirect.search, "?seo_check=1");
  });
}
await mkdir(output, { recursive: true });
await writeFile(resolve(output, "check.json"), JSON.stringify(report, null, 2) + "\n");
console.log(`SEO: ${report.pages.length} pages, ${report.sitemapPages ?? 0} sitemap URLs, ${report.errors.length} errors.`);
if (report.errors.length) {
  console.error(report.errors.join("\n"));
  process.exitCode = 1;
}
