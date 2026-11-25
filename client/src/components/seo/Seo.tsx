import { useEffect } from 'react';
import { OG_IMAGE, SITE_URL } from '@/lib/brand';

interface Props {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
}

const MARK = 'data-seo';

/**
 * A small head manager.
 *
 * react-helmet-async is a heavy dependency for five tags, and in this build it
 * silently failed to write anything (titles stayed at the static index.html
 * value across routes). Doing it directly is deterministic, works for the
 * client-side routes GitHub Pages serves, and lets a tag be removed when a
 * later page does not want it — canonical and noindex included.
 */
function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute(MARK, '1');
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute(MARK, '1');
  tag.setAttribute('href', href);
}

function clearMarked(selectors: string[]): void {
  selectors.forEach((selector) => {
    document.head.querySelectorAll(selector).forEach((node) => {
      if (node.getAttribute(MARK) === '1') node.remove();
    });
  });
}

export function Seo({ title, description, canonicalPath, image, jsonLd, noIndex }: Props) {
  const canonical = canonicalPath ? new URL(canonicalPath, SITE_URL).href : undefined;
  const imageUrl = new URL(image || OG_IMAGE, SITE_URL).href;

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    if (canonical) upsertLink('canonical', canonical);
    else clearMarked(['link[rel="canonical"]']);

    if (canonical) upsertMeta('property', 'og:url', canonical);
    else clearMarked(['meta[property="og:url"]']);

    if (noIndex) upsertMeta('name', 'robots', 'noindex,nofollow');
    else clearMarked(['meta[name="robots"]']);

    const existing = document.getElementById('seo-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-jsonld';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, imageUrl, jsonLd, noIndex]);

  return null;
}
