import { Feed } from "./constants";
import { getIsUrlHttpOrHttps } from "./getIsUrlHttpOrHttps";
import { removeSubstring } from "./removeSubstring";

export function getFeedUrl(
  feed: Feed,
  feedUrlScheme: string | undefined,
): string {
  if (!feedUrlScheme) {
    // Open the Astro site
    return feed.siteUrl;
  }

  let returnUrl = feedUrlScheme;
  if (returnUrl.includes("{feedUrl}")) {
    returnUrl = feed.siteUrl
      ? returnUrl.replaceAll("{feedUrl}", `${feed.siteUrl}`)
      : feed.siteUrl;
  }

  return returnUrl;
}
