const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create hero images with different sizes
const images = [
  {
    name: 'hero-mobile.webp',
    width: 1080,
    height: 1920,
    label: 'MOBILE\n1080x1920\n9:16',
    gradient: ['#1a2332', '#2d4059']
  },
  {
    name: 'hero-desktop.webp',
    width: 1920,
    height: 1080,
    label: 'DESKTOP\n1920x1080\n16:9',
    gradient: ['#2d4059', '#4a6fa5']
  },
  {
    name: 'hero-desktop-2x.webp',
    width: 2560,
    height: 1440,
    label: 'LARGE DESKTOP\n2560x1440\n16:9',
    gradient: ['#4a6fa5', '#6ba3d4']
  }
];

images.forEach(img => {
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, img.width, img.height);
  gradient.addColorStop(0, img.gradient[0]);
  gradient.addColorStop(1, img.gradient[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, img.width, img.height);

  // Add decorative elements (circles and shapes)
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#ffffff';

  // Large circles
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * img.width;
    const y = Math.random() * img.height;
    const radius = 100 + Math.random() * 200;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  // Add text label
  const fontSize = Math.min(img.width, img.height) / 15;
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = img.label.split('\n');
  const lineHeight = fontSize * 1.2;
  const startY = img.height / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, img.width / 2, startY + index * lineHeight);
  });

  // Add corner text
  ctx.font = `${fontSize * 0.4}px Arial`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('Entersys Example Image', img.width - 20, 20);

  // Save as WebP
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, 'public', 'imagenes', 'inicio', img.name.replace('.webp', '.png'));
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Created ${img.name.replace('.webp', '.png')}`);
});

console.log('\n✓ All example images created successfully!');
console.log('Note: Images are in PNG format. For production, convert to WebP using an online tool or image editor.');
