[Download for Chrome](https://chromewebstore.google.com/detail/astro-spotted)

[Download for Firefox](https://addons.mozilla.org/en-US/firefox/addon/astro-spotted/)

# Astro Spotted

Astro Spotted is a browser extension that helps you discover and collect websites built with Astro. Here's how it works:

1. Websites built with Astro include a generator meta tag in their HTML
2. Astro Spotted quietly detects these sites as you browse
3. Browse the web as usual. Astro Spotted will build a collection of Astro-powered sites as you go.


![Screenshot of Astro Spotted pop-up showing list of discovered Astro sites](assets/astro-spotted-screenshot.png)


## Features

Once installed Astro Spotted will detect and collect websites built with Astro as you visit them.
Click on the extension to open the pop-up, which shows the list of collected Astro sites.

At the top right you can open the `...` menu to customize Astro Spotted.

### Export collection

You can export your discovered Astro sites in a structured format.
If you'd like to save or share your collection, you can use this export feature.


### Open with custom handler

The "Open With…" feature allows you to choose how Astro sites are opened.
The default (empty string) will open the Astro site in a new tab.
You can set custom handlers to integrate with other tools.

If you use a different handler you can try integrating yourself.
The URL is a template that replaces `{feedUrl}` with the Astro site's URL.
For example: `https://example.com/?site={feedUrl}`.


## Calm tech features

Astro Spotted doesn't compete for your attention.
The extension quietly collects Astro sites, allowing you to explore them when you are ready.


## Additional docs

See build.md, test.md, and changelog.md to develop this extension.


## Fork of StreetPass for Mastodon

This project builds on the wonderful [StreetPass for Mastodon](https://github.com/tvler/streetpass) browser extension, adapting it to detect Astro-powered websites.


## License

Consistent with the StreetPass license, this project is open-source under the MIT license.


## Privacy commitments

**Nothing leaves your device**

Astro Spotted runs entirely in your browser and will never collect analytics.
This means that Astro Spotted doesn't require any sort of server being up-and-running for you to use it.
Once installed, it's yours forever.

