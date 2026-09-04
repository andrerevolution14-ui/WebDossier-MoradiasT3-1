const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const files = [
  'public/videos/ApresentacaoWebDocT3.mp4',
  'public/videos/tour-exterior.mp4',
  'public/videos/tour-interior.mp4'
];

files.forEach(f => {
  try {
    execSync(`"${ffmpeg}" -i "${f}"`, { stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (e) {
    const errText = e.stderr.toString();
    const info = errText.split('\n').filter(l => l.includes('Duration') || l.includes('Stream #')).join('\n');
    console.log(`=== ${f} ===\n${info}\n`);
  }
});
