import { z } from "zod";
import {
  Message,
  MessageReturn,
  Feed,
} from "./constants";
import { getUncachedFeedData } from "./getUncachedFeedData";
import { getIsUrlHttpOrHttps } from "./getIsUrlHttpOrHttps";
import { getHrefStore } from "./storage";

type ArgMap = {
  [Key in Message["name"]]: Extract<Message, { name: Key }>["args"];
};

export const messageCallbacks: {
  [K in keyof ArgMap]: (value: ArgMap[K]) => z.infer<(typeof MessageReturn)[K]>;
} = {
  async HREF_PAYLOAD(args) {
    if (!getIsUrlHttpOrHttps(args.siteHref)) {
      return;
    }

    const hasExistingHrefData = (
      await getHrefStore((prev) => {
        const hrefStore = new Map(prev);
        return hrefStore;
      })
    ).has(args.siteHref);

    if (hasExistingHrefData) {
      return;
    }

    const siteData = {
      type: "astroSite",
      siteName: args.siteName,
      siteUrl: args.siteHref,
      favicon: args.faviconHref,
    };

    await getHrefStore((hrefStore) => {
      const newHrefStore = new Map(hrefStore);
      newHrefStore.set(args.siteHref, {
        feedData: siteData,
        viewedAt: Date.now(),
        websiteUrl: args.tabUrl,
        feedHref: args.siteHref,
      });

      return newHrefStore;
    });
  },
};

/**
 * Thanks to https://stackoverflow.com/questions/70598583/argument-of-type-string-number-is-not-assignable-to-parameter-of-type-never
 * And https://github.com/Microsoft/TypeScript/issues/30581#issuecomment-1008338350
 * todo look at https://github.com/Microsoft/TypeScript/issues/30581#issuecomment-1080979994
 */
export function runMessageCallback<K extends keyof ArgMap>(
  message: { [P in K]: { name: P; args: ArgMap[P] } }[K],
): z.infer<(typeof MessageReturn)[K]> {
  return messageCallbacks[message.name](message.args);
}
