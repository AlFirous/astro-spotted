import type { DeepReadonly } from "ts-essentials";
import { HrefDataType, HrefStore } from "./constants";

export function getFeeds(
  hrefStore: DeepReadonly<HrefStore>,
  options?: { hidden?: boolean },
): Array<HrefDataType<"astroSite">> {
  const sites: Array<HrefDataType<"astroSite">> = [];

  for (const hrefData of hrefStore.values()) {
    if (hrefData.feedData.type !== "astroSite") {
      continue;
    }

    if (!!hrefData.hidden !== !!options?.hidden) {
      continue;
    }

    sites.push({
      ...hrefData,
      feedData: hrefData.feedData,
    });
  }

  return sites.sort((a, b) => b.viewedAt - a.viewedAt);
}
