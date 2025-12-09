# Icon Setup Instructions for Astro Spotted

## Current Status
- ✅ Extension code fully refactored from RSS feed detector to Astro site detector
- ✅ Rocket icon SVG template created: `extension/public/rocket-icon.svg`
- ✅ Icon generation script ready: `extension/scripts/gen-rocket-icons.mjs`
- ⏳ **NEXT**: Generate PNG icons from the SVG template

## Generate Rocket Icons

### Method 1: Using Online Converter (Easiest)
1. Visit https://convertio.co/svg-png/ (or similar online tool)
2. Upload the file: `extension/public/rocket-icon.svg`
3. Convert to PNG
4. Download the PNG (will be 256x256)
5. Resize to other required sizes using an image editor:
   - 16x16 (action-active-16.png, action-inactive-16.png)
   - 19x19 (action-active-19.png, action-inactive-19.png)
   - 32x32 (action-active-32.png, action-inactive-32.png)
   - 38x38 (action-active-38.png, action-inactive-38.png)
   - 128x128 (icon-128.png, icon-128-nopadding.png)
   - 256x256 (icon-256.png, icon-256-nopadding.png)

### Method 2: Using Inkscape (Free Desktop Tool)
1. Install Inkscape from https://inkscape.org/
2. Open `extension/public/rocket-icon.svg` in Inkscape
3. Export as PNG for each required size:
   - File → Export As → Choose size → Export

### Method 3: Using Node.js with Canvas
```bash
cd extension

# Install canvas library
npm install --save-dev canvas

# Generate all icon sizes automatically
npm run gen:icons
```

### Method 4: Manual Design in Image Editor
If you prefer custom design:
1. Open Adobe Illustrator, Figma, or similar
2. Create a new rocket icon (or import the SVG)
3. Export as PNG at each required size
4. Place files in `extension/public/`

## Files Needed

After generating, you should have these files in `extension/public/`:

### Main Icons (App & Tab Icons)
- `icon-16.png` (16x16)
- `icon-19.png` (19x19)
- `icon-32.png` (32x32)
- `icon-38.png` (38x38)
- `icon-128.png` (128x128)
- `icon-256.png` (256x256)

### Safari No-Padding Variants
- `icon-128-nopadding.png` (128x128)
- `icon-256-nopadding.png` (256x256)

### Action Icons (Toolbar Button)
**Inactive State** (gray/muted):
- `action-inactive-16.png` (16x16)
- `action-inactive-19.png` (19x19)
- `action-inactive-32.png` (32x32)
- `action-inactive-38.png` (38x38)

**Active State** (colored):
- `action-active-16.png` (16x16)
- `action-active-19.png` (19x19)
- `action-active-32.png` (32x32)
- `action-active-38.png` (38x38)

## Icon Design Guidelines

The rocket icon should:
- ✈️ Be recognizable at small sizes (16px)
- 🎨 Use bright, vibrant colors (orange/red body, yellow flames)
- 🔍 Have clear contrast with backgrounds
- 📱 Have appropriate padding for different use cases
- ♿ Be accessible (good contrast ratios)

### Color Suggestions
- **Rocket Body**: #FF6B35 (Coral Red)
- **Nose Cone**: #FF8C42 (Orange)
- **Window**: #FFD700 (Gold)
- **Flames**: #FF4500 (Dark Orange)
- **Highlights**: #FFD700 (Gold)
- **Inactive**: #999999 (Gray)

## After Icon Setup

### 1. Verify Icons
```bash
# Check that all icon files exist
ls -la extension/public/icon-*.png
ls -la extension/public/action-*.png
```

### 2. Build the Extension
```bash
cd extension
yarn install
yarn build
```

### 3. Test in Browser
- **Chrome**: Load unpacked extension from `extension/dist-chrome`
- **Firefox**: Load temporary extension from `extension/dist-firefox`
- **Safari**: Use Xcode to test from `extension/dist-safari`

### 4. Verify Detection Works
1. Visit an Astro-built website (e.g., https://astro.build, https://github.com/withastro)
2. Check that Astro Spotted detects and displays the site
3. Verify the rocket icon appears in the toolbar
4. Check that the extension popup shows the detected Astro sites

## Troubleshooting

### Icons not showing
- [ ] Verify all PNG files are in `extension/public/`
- [ ] Check file names match exactly (case-sensitive on Linux/Mac)
- [ ] Ensure PNG files are valid (not corrupted)
- [ ] Clear browser cache and reload extension

### Icon too small/blurry
- [ ] Check DPI (should be 72 DPI for web)
- [ ] Verify scaling is correct (especially for small sizes)
- [ ] Ensure no compression artifacts

### Build errors
- [ ] Run `yarn install` to update dependencies
- [ ] Clear `dist-*` folders and rebuild
- [ ] Check browser console for error messages

## Icon Placeholder Status

Currently, placeholder PNG files are created. These are minimal 1x1 pixel PNGs that won't display properly. Replace them with actual rocket icons following the methods above.

To verify placeholder status:
```bash
# Should show "1 x 1" dimensions
file extension/public/icon-256.png
```

After generating real icons:
```bash
# Should show "256 x 256" dimensions
file extension/public/icon-256.png
```

## Questions or Issues?

If you need help creating the icons:
1. Check the rocket SVG template for reference: `extension/public/rocket-icon.svg`
2. Use online tools like https://www.svgtoimg.com for quick conversion
3. Consider using design tools like Figma (free tier available)
4. Look at existing browser extension icons for inspiration

---

**Next Step**: Generate the rocket PNG icons using one of the methods above, then test the extension in your target browsers!
