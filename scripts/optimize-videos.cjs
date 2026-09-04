const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const videos = [
  {
    input: 'public/videos/ApresentacaoWebDocT3.mp4',
    temp: 'public/videos/ApresentacaoWebDocT3.opt.mp4',
    scale: "scale='min(1920,iw)':-2"
  },
  {
    input: 'public/videos/tour-exterior.mp4',
    temp: 'public/videos/tour-exterior.opt.mp4',
    scale: "scale=-2:'min(1920,ih)'"
  },
  {
    input: 'public/videos/tour-interior.mp4',
    temp: 'public/videos/tour-interior.opt.mp4',
    scale: "scale=-2:'min(1920,ih)'"
  }
];

console.log('Starting video optimization using ffmpeg...');

for (const v of videos) {
  const inputPath = path.resolve(v.input);
  const tempPath = path.resolve(v.temp);
  const origSize = fs.statSync(inputPath).size;

  console.log(`\nOptimizing ${v.input} (Original size: ${(origSize / 1024 / 1024).toFixed(2)} MB)...`);

  const cmd = `"${ffmpeg}" -y -i "${inputPath}" -vf "${v.scale}" -c:v libx264 -preset medium -crf 23 -maxrate 3500k -bufsize 7000k -r 30 -pix_fmt yuv420p -c:a aac -b:a 128k -ar 44100 -movflags +faststart "${tempPath}"`;
  
  execSync(cmd, { stdio: 'inherit' });

  const newSize = fs.statSync(tempPath).size;
  console.log(`Optimized ${v.input}: ${(newSize / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - newSize / origSize) * 100)}% reduction!)`);
}

console.log('\nAll videos successfully optimized!');
