import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public');
const screenshotsDir = join(publicDir, 'screenshots');
const logoPath = join(publicDir, 'entersys_logo.png');

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('📸 Generating PWA screenshots...\n');

async function generateScreenshots() {
  try {
    // Desktop screenshot (1920x1080)
    await sharp({
      create: {
        width: 1920,
        height: 1080,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(800, null, { fit: 'inside' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(join(screenshotsDir, 'desktop-home.png'));

    console.log('✅ Generated: desktop-home.png (1920x1080)');

    // Mobile screenshot (750x1334)
    await sharp({
      create: {
        width: 750,
        height: 1334,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(600, null, { fit: 'inside' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(join(screenshotsDir, 'mobile-home.png'));

    console.log('✅ Generated: mobile-home.png (750x1334)');

    console.log('\n🎉 All PWA screenshots generated successfully!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
    console.log('\n💡 Note: These are placeholder screenshots. Replace them with actual app screenshots for better user experience.');

  } catch (error) {
    console.error('❌ Error generating screenshots:', error);
    process.exit(1);
  }
}

generateScreenshots();
