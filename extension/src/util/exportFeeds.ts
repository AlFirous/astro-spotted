import { getDataUrlFromFile } from "./getDataUrlFromFile";
import { getFeeds } from "./getFeeds";
import { getHrefStore } from "./storage";

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '"': return '&quot;';
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '\'': return '&apos;';
        }
    });
}

export async function exportFeeds(): Promise<void> {
  const feeds = getFeeds(await getHrefStore());

  let xmlDoc = document.implementation.createDocument(null, "opml");
  xmlDoc.children[0].setAttribute("version", "2.0");

  let xmlHead = xmlDoc.createElement("head");
  xmlDoc.children[0].appendChild(xmlHead);

  let xmlHeadTitle = xmlDoc.createElement("title");
  xmlHead.appendChild(xmlHeadTitle);
  xmlHeadTitle.appendChild(xmlDoc.createTextNode("Exported from Astro Spotted"));

  let xmlHeadDescription = xmlDoc.createElement("description");
  xmlHead.appendChild(xmlHeadDescription);
  xmlHeadDescription.appendChild(xmlDoc.createTextNode("These Astro sites were collected by the Astro Spotted browser extension"));

  let xmlBody = xmlDoc.createElement("body");
  xmlDoc.children[0].appendChild(xmlBody);

  for (const site of feeds) {
    let xmlOutline = xmlDoc.createElement("outline");
    xmlOutline.setAttribute("type", "link");
    xmlOutline.setAttribute("text", escapeXml(site.feedData.siteName || site.feedData.siteUrl));
    xmlOutline.setAttribute("url", escapeXml(site.feedHref));
    xmlOutline.setAttribute("htmlUrl", escapeXml(site.websiteUrl));
    xmlOutline.setAttribute("category", "astro");
    xmlBody.appendChild(xmlOutline);
    console.log(site);
  }

  const xmlstr = (new XMLSerializer()).serializeToString(xmlDoc);

  const blob = new Blob([xmlstr], {
    type: "application/xml",
  });

  browser.tabs.create({
    url:
      /**
       * Chrome needs to use this method, because otherwise the blob isn't
       * recognized as a JSON file and won't allow downloading via command + s.
       * the opened tab will have a url blob:chrome-extension instead of data:application/json
       */
      __TARGET__ === "chrome"
        ? await getDataUrlFromFile(blob)
        : URL.createObjectURL(blob),
  });

  window.close();
}
