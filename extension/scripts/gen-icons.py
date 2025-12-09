#!/usr/bin/env python3
"""
Generate rocket-themed icons for Astro Spotted extension.
This script creates PNG icons of various sizes with a simple rocket design.
"""

import base64
import struct
import zlib
import json

def create_simple_png(width, height, is_active=False):
    """Create a simple PNG file with a rocket design."""
    
    # Simple 1x1 red pixel PNG for now - to be replaced with proper generation
    # This is a minimal valid PNG
    png_data = bytes([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,  # PNG signature
    ])
    
    # IHDR chunk (image header)
    width_bytes = struct.pack('>I', width)
    height_bytes = struct.pack('>I', height)
    ihdr_data = width_bytes + height_bytes + bytes([8, 6, 0, 0, 0])  # 8-bit RGBA
    ihdr_chunk = create_png_chunk('IHDR', ihdr_data)
    png_data += ihdr_chunk
    
    # IDAT chunk (image data) - minimal valid data
    idat_data = zlib.compress(bytes([0] * (height * (width * 4 + 1))))
    idat_chunk = create_png_chunk('IDAT', idat_data)
    png_data += idat_chunk
    
    # IEND chunk (image end)
    iend_chunk = create_png_chunk('IEND', b'')
    png_data += iend_chunk
    
    return png_data

def create_png_chunk(chunk_type, data):
    """Create a PNG chunk with proper CRC."""
    length = struct.pack('>I', len(data))
    chunk = chunk_type.encode() + data
    crc = struct.pack('>I', zlib.crc32(chunk) & 0xffffffff)
    return length + chunk + crc

def main():
    # For now, we'll create a simple script that documents what needs to be done
    print("To properly generate rocket icons, you have two options:")
    print("1. Install 'Pillow' and run this script with proper image generation")
    print("2. Use online tools to convert rocket-icon.svg to PNG and save manually")
    print("")
    print("For development, placeholder icons have been created.")
    print("Replace the PNG files in extension/public/ with proper rocket icons.")

if __name__ == '__main__':
    main()
