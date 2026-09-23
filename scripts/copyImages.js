import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'shakthi');
const destBase = path.join(__dirname, '..', 'public', 'images', 'events');

if (!fs.existsSync(destBase)) {
  fs.mkdirSync(destBase, { recursive: true });
}

for (let i = 1; i <= 10; i++) {
  const dayDir = path.join(destBase, `day-${String(i).padStart(2, '0')}`);
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, { recursive: true });
  }
}

const files = fs.readdirSync(srcDir);

function copyFileMatching(predicate, destSubdir, newName) {
  const matched = files.find(predicate);
  if (matched) {
    const srcPath = path.join(srcDir, matched);
    const ext = path.extname(matched);
    const finalName = newName ? (newName.includes('.') ? newName : newName + ext) : matched;
    const destPath = path.join(destBase, destSubdir, finalName);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied [${matched}] -> [${destSubdir}/${finalName}]`);
  } else {
    console.warn(`Could not find match for ${destSubdir}/${newName}`);
  }
}

function copyAllMatching(predicate, destSubdir, prefix) {
  const matchedList = files.filter(predicate);
  matchedList.forEach((file, index) => {
    const srcPath = path.join(srcDir, file);
    const ext = path.extname(file);
    const finalName = prefix ? `${prefix}-${index + 1}${ext}` : file;
    const destPath = path.join(destBase, destSubdir, finalName);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied [${file}] -> [${destSubdir}/${finalName}]`);
  });
}

// Day 1
copyFileMatching(f => f.toLowerCase() === 'pothuraju.jpg', 'day-01', 'pothuraju.jpg');
copyAllMatching(f => f.includes('Gangamma'), 'day-01', 'gangamma');

// Day 2
copyFileMatching(f => f.toLowerCase() === 'day2.jpg', 'day-02', 'day2-main.jpg');
copyFileMatching(f => f.toLowerCase() === 'day2.webp', 'day-02', 'day2-dance.webp');
copyFileMatching(f => f.toLowerCase() === 'raagaday2.webp', 'day-02', 'raaga-music.webp');
copyFileMatching(f => f.includes('Krishna') || f.includes('Janmashtam'), 'day-02', 'krishna-devotion.webp');

// Day 3
copyFileMatching(f => f.toLowerCase() === 'bathukama.bmp', 'day-03', 'bathukamma-1.bmp');
copyFileMatching(f => f.toLowerCase() === 'bathukama.jpeg', 'day-03', 'bathukamma-2.jpeg');

// Day 4
copyFileMatching(f => f.toLowerCase() === 'north.jpg', 'day-04', 'north-1.jpg');
copyFileMatching(f => f.toLowerCase() === 'north2.jpg', 'day-04', 'north-2.jpg');
copyFileMatching(f => f.toLowerCase() === 'north (2).jpg', 'day-04', 'north-3.jpg');
copyFileMatching(f => f.toLowerCase() === 'north (3).jpg', 'day-04', 'north-4.jpg');
copyAllMatching(f => f.toUpperCase().includes('DHUNUCHI'), 'day-04', 'dhunuchi-naach');
copyFileMatching(f => f.includes('durgapuja') || f.includes('durgotsav'), 'day-04', 'durga-puja.jpg');

// Day 5
copyFileMatching(f => f.toLowerCase() === 'dandiya.jpg', 'day-05', 'dandiya-1.jpg');
copyFileMatching(f => f.toLowerCase() === 'dandiya (2).jpg', 'day-05', 'dandiya-2.jpg');
copyFileMatching(f => f.toLowerCase() === 'dandiyaa.jpg', 'day-05', 'dandiya-3.jpg');
copyFileMatching(f => f.toLowerCase() === 'dandiyaa (2).jpg', 'day-05', 'dandiya-4.jpg');
copyFileMatching(f => f.includes('dandiyanights') || f.includes('Dandiya nights') || f.includes('garbanight'), 'day-05', 'dandiya-5.jpg');

// Day 6
copyFileMatching(f => f.toLowerCase() === 'carrom.jpg', 'day-06', 'carrom.jpg');
copyFileMatching(f => f.toLowerCase() === 'housie.png', 'day-06', 'housie.png');
copyFileMatching(f => f.toLowerCase().includes('thug of war'), 'day-06', 'tug-of-war.jpg');
copyFileMatching(f => f.toLowerCase() === 'pot.jpeg', 'day-06', 'pot-1.jpeg');
copyFileMatching(f => f.toLowerCase() === 'potery.jpg', 'day-06', 'pottery-2.jpg');
copyFileMatching(f => f.toLowerCase() === 'live-drawing.webp', 'day-06', 'live-drawing.webp');

// Day 7
copyFileMatching(f => f.toLowerCase() === 'homam.jpg', 'day-07', 'homam.jpg');
copyFileMatching(f => f.toLowerCase() === 'kukuma.jpg', 'day-07', 'kukuma.jpg');
copyFileMatching(f => f.toLowerCase() === 'kukumarchana.jpg', 'day-07', 'kukumarchana.jpg');

// Day 8
copyFileMatching(f => f.toLowerCase() === 'cooking.jpg', 'day-08', 'cooking-1.jpg');
copyFileMatching(f => f.toLowerCase() === 'cooking.jpeg', 'day-08', 'cooking-2.jpeg');

// Day 9: 0 images (graceful fallback state)

// Day 10
copyFileMatching(f => f.toLowerCase() === 'visarjan.jpg', 'day-10', 'visarjan.jpg');

console.log('Image organization completed successfully!');
