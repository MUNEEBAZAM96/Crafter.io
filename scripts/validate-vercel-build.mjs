import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const vercelConfigPath = path.join(repositoryRoot, 'vercel.json');
const expectedBuildCommand = 'pnpm --filter @workspace/crafter-io run build';
const expectedOutputDirectory = 'artifacts/crafter-io/dist/public';

function fail(message) {
  console.error(`Vercel build validation failed: ${message}`);
  process.exit(1);
}

function readVercelConfig() {
  try {
    return JSON.parse(readFileSync(vercelConfigPath, 'utf8'));
  } catch (error) {
    fail(
      `could not read ${path.relative(repositoryRoot, vercelConfigPath)}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

function countFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).reduce(
    (fileCount, entry) => {
      const entryPath = path.join(directory, entry.name);
      return fileCount + (entry.isDirectory() ? countFiles(entryPath) : 1);
    },
    0,
  );
}

const vercelConfig = readVercelConfig();

if (vercelConfig.framework !== 'vite') {
  fail(`vercel.json must use the Vite framework (found ${vercelConfig.framework})`);
}

if (vercelConfig.buildCommand !== expectedBuildCommand) {
  fail(
    `vercel.json buildCommand must be "${expectedBuildCommand}" (found "${vercelConfig.buildCommand}")`,
  );
}

if (vercelConfig.outputDirectory !== expectedOutputDirectory) {
  fail(
    `vercel.json outputDirectory must be "${expectedOutputDirectory}" (found "${vercelConfig.outputDirectory}")`,
  );
}

console.log('Vercel configuration targets the Crafter.io build and output directory.');

const buildEnvironment = { ...process.env };
delete buildEnvironment.PORT;
delete buildEnvironment.BASE_PATH;

console.log('Running the Crafter.io production build without PORT or BASE_PATH...');

try {
  execFileSync('pnpm', ['--filter', '@workspace/crafter-io', 'run', 'build'], {
    cwd: repositoryRoot,
    env: buildEnvironment,
    stdio: 'inherit',
  });
} catch (error) {
  fail(
    `the Crafter.io build command exited unsuccessfully${
      error && typeof error === 'object' && 'status' in error
        ? ` (status ${error.status})`
        : ''
    }`,
  );
}

const outputDirectory = path.join(repositoryRoot, expectedOutputDirectory);
const entrypoint = path.join(outputDirectory, 'index.html');
const assetsDirectory = path.join(outputDirectory, 'assets');

if (!existsSync(outputDirectory) || !statSync(outputDirectory).isDirectory()) {
  fail(`expected output directory is missing: ${expectedOutputDirectory}`);
}

if (!existsSync(entrypoint) || !statSync(entrypoint).isFile()) {
  fail(`expected app entrypoint is missing: ${path.join(expectedOutputDirectory, 'index.html')}`);
}

if (!existsSync(assetsDirectory) || !statSync(assetsDirectory).isDirectory()) {
  fail(`expected bundled assets directory is missing: ${path.join(expectedOutputDirectory, 'assets')}`);
}

const assetFileCount = countFiles(assetsDirectory);
if (assetFileCount === 0) {
  fail(`expected bundled assets directory to contain files: ${path.join(expectedOutputDirectory, 'assets')}`);
}

console.log(
  `Vercel build validation passed: ${expectedOutputDirectory}/index.html and ${assetFileCount} bundled asset file(s) are present.`,
);