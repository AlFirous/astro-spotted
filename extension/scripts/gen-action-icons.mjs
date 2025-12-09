#!/usr/bin/env node

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

const actionSizes = [16, 19, 32, 38];

function drawActionRocket(canvas, active = false) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const scale = size / 128;
  
  // Colors based on active state
  const rocketColor = active ? '#FF6B35' : '#999999';
  const noseColor = active ? '#FF8C42' : '#AAAAAA';
  const windowColor = active ? '#FFD700' : '#CCCCCC';
  const fireColor = active ? '#FF4500' : '#999999';
  const fireHighlight = active ? '#FFD700' : '#BBBBBB';
  
  // Rocket body
  ctx.fillStyle = rocketColor;
  ctx.fillRect(45 * scale, 10 * scale, 38 * scale, 70 * scale);
  
  // Rocket nose cone
  ctx.fillStyle = noseColor;
  ctx.beginPath();
  ctx.moveTo(64 * scale, 5 * scale);
  ctx.lineTo(77 * scale, 20 * scale);
  ctx.lineTo(51 * scale, 20 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Window
  ctx.fillStyle = windowColor;
  ctx.beginPath();
  ctx.arc(64 * scale, 30 * scale, 7 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Left fin
  ctx.fillStyle = rocketColor;
  ctx.beginPath();
  ctx.moveTo(45 * scale, 60 * scale);
  ctx.lineTo(30 * scale, 80 * scale);
  ctx.lineTo(45 * scale, 70 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Right fin
  ctx.beginPath();
  ctx.moveTo(83 * scale, 60 * scale);
  ctx.lineTo(98 * scale, 80 * scale);
  ctx.lineTo(83 * scale, 70 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Flames
  ctx.fillStyle = fireColor;
  ctx.beginPath();
  ctx.moveTo(55 * scale, 80 * scale);
  ctx.lineTo(59 * scale, 115 * scale);
  ctx.lineTo(50 * scale, 85 * scale);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = fireHighlight;
  ctx.fillRect(62 * scale, 81 * scale, 4 * scale, 30 * scale);
  
  ctx.fillStyle = fireColor;
  ctx.beginPath();
  ctx.moveTo(73 * scale, 80 * scale);
  ctx.lineTo(69 * scale, 115 * scale);
  ctx.lineTo(78 * scale, 85 * scale);
  ctx.closePath();
  ctx.fill();
}

async function generateActionIcons() {
  try {
    // Generate inactive action icons
    for (const size of actionSizes) {
      const canvas = createCanvas(size, size);
      drawActionRocket(canvas, false);
      
      const buffer = canvas.toBuffer('image/png');
      const outputPath = path.join(publicDir, `action-inactive-${size}.png`);
      fs.writeFileSync(outputPath, buffer);
      console.log(`Generated ${outputPath}`);
    }
    
    // Generate active action icons
    for (const size of actionSizes) {
      const canvas = createCanvas(size, size);
      drawActionRocket(canvas, true);
      
      const buffer = canvas.toBuffer('image/png');
      const outputPath = path.join(publicDir, `action-active-${size}.png`);
      fs.writeFileSync(outputPath, buffer);
      console.log(`Generated ${outputPath}`);
    }
    
    console.log('All action rocket icons generated successfully!');
  } catch (error) {
    console.error('Error generating action icons:', error);
    process.exit(1);
  }
}

generateActionIcons();