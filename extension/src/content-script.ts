/* eslint-env browser */

import type { Message } from "./util/constants.js";

function getCurrentUrlSanitized() {
  const url = new URL(window.location.toString());

  // Delete hash
  url.hash = "";

  // Delete UTM parameters https://en.wikipedia.org/wiki/UTM_parameters#UTM_parameters
  url.searchParams.delete("utm_source");
  url.searchParams.delete("utm_medium");
  url.searchParams.delete("utm_campaign");
  url.searchParams.delete("utm_term");
  url.searchParams.delete("utm_content");

  // Delete yahoo trackers https://github.com/brave/adblock-lists/pull/978/files
  url.searchParams.delete("guccounter");
  url.searchParams.delete("guce_referrer");
  url.searchParams.delete("guce_referrer_sig");

  return url.toString();
}

let currentUrlSanitized = getCurrentUrlSanitized();
const hrefs: Set<string> = new Set();

// Normalize and make absolute
function normalizeHref(url) {
  if (url) {
    try {
      return (new URL(url, document.baseURI)).href;
    } catch (err) {
    }
  }
  return '';
}

function processAstroSite(astroMeta, iconHref) {
  // Astro sites are identified by the presence of the astro generator meta tag
  let websiteHref = normalizeHref(currentUrlSanitized);

  if (websiteHref && !hrefs.has(websiteHref)) {
    hrefs.add(websiteHref);
    let siteName = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title;

    const message: Message = {
      name: "HREF_PAYLOAD",
      args: {
        faviconHref: iconHref,
        siteHref: websiteHref,
        siteName: siteName,
        tabUrl: currentUrlSanitized,
      },
    };
    browser.runtime.sendMessage(message);
    console.log('Astro site detected');
    console.log(message);
  }
}

function sendHrefs() {
  // Find the best icon for the site
  const icons = document.querySelectorAll(":is(link)[href][rel~='icon']");
  let iconHref = '';
  if (icons.length > 0) {
      iconHref = normalizeHref(icons[0].getAttribute("href"));
  }

  // Detect Astro sites via generator meta tag
  const astroMeta = document.querySelector('meta[name="generator"][content*="Astro"]');
  if (astroMeta) {
    processAstroSite(astroMeta, iconHref);
  }
}

new MutationObserver(() => {
  const testCurrentUrlSanitized = getCurrentUrlSanitized();
  if (currentUrlSanitized !== testCurrentUrlSanitized) {
    currentUrlSanitized = testCurrentUrlSanitized;
    hrefs.clear();
  }

  sendHrefs();
}).observe(document.documentElement, {
  subtree: true,
  childList: true,
  attributeFilter: ["rel"],
});

sendHrefs();
