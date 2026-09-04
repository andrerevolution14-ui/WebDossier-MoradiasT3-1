const fs = require('fs');
const path = require('path');

const list = [
  'ApresentacaoWebDocT3',
  'tour-exterior',
  'tour-interior'
];

list.forEach(name => {
  const opt = `public/videos/${name}.opt.mp4`;
  const targetPublic = `public/videos/${name}.mp4`;
  const targetRoot = `videos/${name}.mp4`;

  if (fs.existsSync(opt)) {
    fs.copyFileSync(opt, targetPublic);
    fs.mkdirSync('videos', { recursive: true });
    fs.copyFileSync(opt, targetRoot);
    fs.unlinkSync(opt);
    console.log(`Updated ${name}.mp4 in public/videos/ and videos/ (${(fs.statSync(targetPublic).size / 1024 / 1024).toFixed(2)} MB)`);
  }
});

// Also create tour-apresentacao.mp4 alias in both dirs
['public/videos', 'videos'].forEach(dir => {
  const src = path.join(dir, 'ApresentacaoWebDocT3.mp4');
  const dst = path.join(dir, 'tour-apresentacao.mp4');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Created alias ${dst}`);
  }
});

