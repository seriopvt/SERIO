const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, 'prisma/app/generated');
const cacheDir = path.join(__dirname, '.prisma-cache');

// In some environments (CI/sandboxes), writing to ~/.cache may fail.
// Prisma respects XDG_CACHE_HOME; keep it inside the repo by default.
try {
  fs.mkdirSync(cacheDir, { recursive: true });
} catch (e) {
  // Best-effort; Prisma can still run without this in many environments.
}

// Prefer local engines (from node_modules) if present to avoid network downloads.
const schemaEngineCandidates = [
  path.join(__dirname, 'node_modules/@prisma/engines/schema-engine-debian-openssl-3.0.x'),
  path.join(__dirname, 'node_modules/@prisma/engines/schema-engine-linux-musl-openssl-3.0.x'),
  path.join(__dirname, 'node_modules/@prisma/engines/schema-engine-darwin'),
  path.join(__dirname, 'node_modules/@prisma/engines/schema-engine-darwin-arm64'),
  path.join(__dirname, 'node_modules/@prisma/engines/schema-engine-windows.exe'),
];

const schemaEngineBinary =
  schemaEngineCandidates.find((p) => {
    try {
      return fs.existsSync(p);
    } catch {
      return false;
    }
  }) ?? null;

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
  const output = execSync('npx prisma generate', {
    encoding: 'utf-8',
    stdio: 'pipe',
    env: {
      ...process.env,
      XDG_CACHE_HOME: process.env.XDG_CACHE_HOME || cacheDir,
      ...(schemaEngineBinary && !process.env.PRISMA_SCHEMA_ENGINE_BINARY
        ? { PRISMA_SCHEMA_ENGINE_BINARY: schemaEngineBinary }
        : {}),
    },
  });
  console.log('Prisma Output:', output);
} catch (e) {
  console.error('Prisma Error:', e.message);
  if (e.stdout) console.error('stdout:', e.stdout);
  if (e.stderr) console.error('stderr:', e.stderr);
}
