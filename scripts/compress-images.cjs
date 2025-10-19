#!/usr/bin/env node
/**
 * Script para comprimir imágenes pesadas usando Sharp
 * Optimiza WebP con calidad 80 manteniendo buena visual
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Imágenes críticas que necesitan compresión
const imagesToCompress = [
  // Imagen más pesada - 1.2MB!
  {
    input: 'public/imagenes/contacto/cdmx.webp',
    quality: 75,
    targetSize: 300 // KB
  },
  // Hero images de nosotros
  {
    input: 'public/imagenes/nosotros/banner_leaders_entersys_nosotros.webp',
    quality: 78,
    targetSize: 100
  },
  {
    input: 'public/imagenes/nosotros/hero_principal_nosotros-escritorio-2x.webp',
    quality: 78,
    targetSize: 90
  },
  // Contacto
  {
    input: 'public/imagenes/contacto/monterrey_skyline.webp',
    quality: 78,
    targetSize: 120
  },
  {
    input: 'public/imagenes/contacto/modern_office_workspace.webp',
    quality: 78,
    targetSize: 90
  },
  // Expersys/Clientes
  {
    input: 'public/imagenes/expersys/peak_office_expersys.webp',
    quality: 78,
    targetSize: 90
  },
  {
    input: 'public/imagenes/clientes/peak_office_expersys.webp',
    quality: 78,
    targetSize: 90
  },
  // Inicio - diferenciadores
  {
    input: 'public/imagenes/inicio/diferenciadores_cumplimiento_inicio.webp',
    quality: 80,
    targetSize: 45
  },
  {
    input: 'public/imagenes/inicio/diferenciadores_escalabilidad_inicio.webp',
    quality: 80,
    targetSize: 45
  },
  {
    input: 'public/imagenes/inicio/diferenciadores_eficiencia_inicio.webp',
    quality: 80,
    targetSize: 40
  },
  {
    input: 'public/imagenes/inicio/hero_principal_inicio-escritorio-2x.webp',
    quality: 78,
    targetSize: 50
  }
];

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return Math.round(stats.size / 1024); // KB
}

async function compressImage(imageConfig) {
  const { input, quality, targetSize } = imageConfig;
  const inputPath = path.join(process.cwd(), input);

  try {
    // Verificar que el archivo existe
    await fs.access(inputPath);

    const originalSize = await getFileSize(inputPath);

    // Crear backup
    const backupPath = inputPath.replace('.webp', '.webp.backup');
    await fs.copyFile(inputPath, backupPath);

    // Comprimir imagen
    await sharp(inputPath)
      .webp({
        quality,
        effort: 6, // Mayor esfuerzo de compresión (0-6)
        smartSubsample: true
      })
      .toFile(inputPath + '.temp');

    // Reemplazar original
    await fs.rename(inputPath + '.temp', inputPath);

    const newSize = await getFileSize(inputPath);
    const reduction = Math.round(((originalSize - newSize) / originalSize) * 100);

    console.log(`✅ ${path.basename(input)}`);
    console.log(`   ${originalSize} KB → ${newSize} KB (-${reduction}%)`);

    // Si la compresión no fue suficiente, advertir
    if (newSize > targetSize) {
      console.log(`   ⚠️  Still above target (${targetSize} KB)`);
    }

    return { originalSize, newSize, reduction };

  } catch (error) {
    console.error(`❌ Error compressing ${input}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Starting image compression...\n');

  let totalOriginal = 0;
  let totalNew = 0;
  let processed = 0;

  for (const imageConfig of imagesToCompress) {
    const result = await compressImage(imageConfig);

    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      processed++;
    }

    console.log(''); // Espacio entre imágenes
  }

  const totalReduction = Math.round(((totalOriginal - totalNew) / totalOriginal) * 100);

  console.log('━'.repeat(50));
  console.log(`\n📊 Summary:`);
  console.log(`   Processed: ${processed}/${imagesToCompress.length} images`);
  console.log(`   Total size: ${totalOriginal} KB → ${totalNew} KB`);
  console.log(`   Total reduction: -${totalReduction}% (-${totalOriginal - totalNew} KB)`);
  console.log('\n✨ Compression complete!');
  console.log('\n💡 Tip: Original files backed up with .webp.backup extension');
}

main().catch(console.error);
