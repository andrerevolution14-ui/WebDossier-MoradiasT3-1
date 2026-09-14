import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const imagesDir = path.resolve('public/images');
const assetsDir = path.resolve('public/assets');

async function convertFile(inputPath, outputPath) {
  try {
    const stat = fs.statSync(inputPath);
    await sharp(inputPath)
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);
    const newStat = fs.statSync(outputPath);
    console.log(`✓ Converted: ${path.basename(inputPath)} (${(stat.size/1024/1024).toFixed(2)}MB -> ${(newStat.size/1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`✗ Error converting ${inputPath}:`, err.message);
  }
}

async function run() {
  const allImages = [
    { in: 'public/images/Exterior Capa.png', out: 'public/images/exterior-capa.webp' },
    { in: 'public/Exterior traseiro completo.png', out: 'public/images/exterior-traseiro-completo.webp' },
    { in: 'public/images/Sala de Jantar.png', out: 'public/images/sala-de-jantar.webp' },
    { in: 'public/images/Cozinha.png', out: 'public/images/cozinha.webp' },
    { in: 'public/images/Quarto Cama.png', out: 'public/images/quarto-cama.webp' },
    { in: 'public/images/Exterior Traseira Longe Barbecue.png', out: 'public/images/exterior-barbecue.webp' },
    { in: 'public/images/Quarto e varanda.png', out: 'public/images/quarto-varanda.webp' },
    { in: 'public/images/Quarto Porta.png', out: 'public/images/quarto-porta.webp' },
    { in: 'public/images/Corredor quartos.png', out: 'public/images/corredor-quartos.webp' },
    { in: 'public/images/Terceiro Andar.png', out: 'public/images/terceiro-andar.webp' },
    { in: 'public/images/WC F2.png', out: 'public/images/wc-f2.webp' },
    { in: 'public/images/Exterior Traseiro.jpg', out: 'public/images/exterior-traseiro.webp' },
    { in: 'public/silvermont1.png', out: 'public/images/silvermont1.webp' },
    { in: 'public/Positive.png', out: 'public/images/positive.webp' },
  ];

  for (const item of allImages) {
    const input = path.resolve(item.in);
    const output = path.resolve(item.out);
    if (fs.existsSync(input)) {
      await convertFile(input, output);
    } else {
      console.log(`⚠️ Not found: ${item.in}`);
    }
  }
  console.log('Done image optimization!');
}

run();
