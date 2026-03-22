const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, 'prisma/app/generated');
try {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('Successfully removed old generated client.');
  }
} catch (e) {
  console.error('Error removing directory:', e);
}

try {
  console.log('Generating Prisma client...');
  const output = execSync('npx prisma generate', { encoding: 'utf-8', stdio: 'pipe' });
  console.log('Prisma Output:', output);
} catch (e) {
  console.error('Prisma Error:', e.message);
  if (e.stdout) console.error('stdout:', e.stdout);
  if (e.stderr) console.error('stderr:', e.stderr);
}
