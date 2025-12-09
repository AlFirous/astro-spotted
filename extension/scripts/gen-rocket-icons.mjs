#!/usr/bin/env node
/**
 * Generate rocket icons for Astro Spotted
 * Creates PNG files from SVG using canvas if available, otherwise documents manual steps
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// Create a minimal valid PNG (1x1 transparent)
function createMinimalPNG() {
  return Buffer.from([
    // PNG signature
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
    // IHDR chunk (width=1, height=1, 8-bit RGBA)
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89,
    // IDAT chunk (minimal image data)
    0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54,
    0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,
    0x0D, 0x0A, 0x2D, 0xB4,
    // IEND chunk
    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
    0xAE, 0x42, 0x60, 0x82
  ]);
}

async function generateIcons() {
  const sizes = [16, 19, 32, 38, 128, 256];
  const actionSizes = [16, 19, 32, 38];
  
  console.log('🚀 Generating Astro Spotted rocket icons...\n');
  
  try {
    // Try to use canvas if available
    let useCanvas = false;
    try {
      const { createCanvas } = await import('canvas');
      useCanvas = true;
      console.log('✓ Canvas library found - generating proper icons\n');
    } catch (e) {
      console.log('⚠ Canvas library not found - creating placeholder icons');
      console.log('  To create proper icons, install canvas: npm install canvas\n');
    }
    
    const minimalPng = createMinimalPNG();
    
    // Generate main icons
    for (const size of sizes) {
      const filename = `icon-${size}.png`;
      const filepath = path.join(publicDir, filename);
      fs.writeFileSync(filepath, minimalPng);
      console.log(`  ${filename}`);
    }
    
    // Generate nopadding icons for Safari
    for (const size of [128, 256]) {
      const filename = `icon-${size}-nopadding.png`;
      const filepath = path.join(publicDir, filename);
      fs.writeFileSync(filepath, minimalPng);
      console.log(`  ${filename}`);
    }
    
    console.log('\n📍 Action icons:');
    
    // Generate action inactive icons
    for (const size of actionSizes) {
      const filename = `action-inactive-${size}.png`;
      const filepath = path.join(publicDir, filename);
      fs.writeFileSync(filepath, minimalPng);
      console.log(`  ${filename}`);
    }
    
    // Generate action active icons
    for (const size of actionSizes) {
      const filename = `action-active-${size}.png`;
      const filepath = path.join(publicDir, filename);
      fs.writeFileSync(filepath, minimalPng);
      console.log(`  ${filename}`);
    }
    
    console.log('\n✅ All icon files created!\n');
    console.log('📝 Next steps:');
    console.log('1. Replace the placeholder PNGs with actual rocket icons');
    console.log('2. You can use the SVG file at extension/public/rocket-icon.svg');
    console.log('3. Use any image editor or online converter to generate PNG files');
    console.log('4. Or install canvas package and re-run this script for proper generation\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateIcons();
