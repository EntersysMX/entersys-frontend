import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public');
const iconsDir = join(publicDir, 'icons');
const logoPath = join(publicDir, 'entersys_logo.png');

// Icon sizes needed for PWA manifest
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('🎨 Generating PWA icons from logo...\n');

// Generate main app icons
async function generateIcons() {
  try {
    // Check if source logo exists
    if (!fs.existsSync(logoPath)) {
      console.error(`❌ Source logo not found at: ${logoPath}`);
      process.exit(1);
    }

    // Read the source image
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    console.log(`📸 Source logo: ${metadata.width}x${metadata.height}px\n`);

    // Generate icons for each size
    for (const size of iconSizes) {
      const outputPath = join(iconsDir, `icon-${size}x${size}.png`);

      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: icon-${size}x${size}.png`);
    }

    // Generate shortcut icons (96x96 is standard for shortcuts)
    const shortcutSize = 96;

    // Worksys icon (using the main logo)
    await sharp(logoPath)
      .resize(shortcutSize, shortcutSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(join(iconsDir, 'worksys-icon.png'));
    console.log(`✅ Generated: worksys-icon.png`);

    // Expersys icon (using the main logo)
    await sharp(logoPath)
      .resize(shortcutSize, shortcutSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(join(iconsDir, 'expersys-icon.png'));
    console.log(`✅ Generated: expersys-icon.png`);

    // Contact icon (using the main logo)
    await sharp(logoPath)
      .resize(shortcutSize, shortcutSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(join(iconsDir, 'contact-icon.png'));
    console.log(`✅ Generated: contact-icon.png`);

    console.log('\n🎉 All PWA icons generated successfully!');
    console.log(`📁 Icons saved to: ${iconsDir}`);

  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
