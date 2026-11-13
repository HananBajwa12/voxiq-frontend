import { useEffect } from 'react';

export default function usePageMetadata({ title, description, ogTitle, ogDescription, url, image }) {
  useEffect(() => {
    const previousTitle = document.title;
    const restore = [];
    document.title = title;

    const setTag = (selector, tag, attributes, valueAttribute, value) => {
      const existing = document.head.querySelector(selector);
      const element = existing || document.createElement(tag);
      const previousValue = element.getAttribute(valueAttribute);
      for (const [key, attribute] of Object.entries(attributes)) element.setAttribute(key, attribute);
      element.setAttribute(valueAttribute, value);
      if (!existing) document.head.appendChild(element);
      restore.push(() => {
        if (!existing) element.remove();
        else if (previousValue === null) element.removeAttribute(valueAttribute);
        else element.setAttribute(valueAttribute, previousValue);
      });
    };

    setTag('meta[name="description"]', 'meta', { name: 'description' }, 'content', description);
    for (const [property, content] of Object.entries({
      'og:title': ogTitle,
      'og:description': ogDescription,
      'og:type': 'website',
      'og:url': url,
      'og:image': image,
    })) setTag(`meta[property="${property}"]`, 'meta', { property }, 'content', content);
    setTag('link[rel="canonical"]', 'link', { rel: 'canonical' }, 'href', url);

    return () => {
      document.title = previousTitle;
      restore.forEach(reset => reset());
    };
  }, [title, description, ogTitle, ogDescription, url, image]);
}
