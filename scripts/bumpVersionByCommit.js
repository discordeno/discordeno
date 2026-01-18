import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const packageName = process.argv[2];

if (!packageName) {
  throw new Error('No package name specified');
}

const commitHash = execSync('git rev-parse HEAD').toString().slice(0, 7);

const file = JSON.parse(await readFile(`packages/${packageName}/package.json`, 'utf-8'));

const version = file.version.split('-')[0];

file.version = `${bumpPatch(version)}-next.${commitHash}`;

if (file.dependencies) {
  Object.keys(file.dependencies).forEach((dependency) => {
    if (dependency.startsWith('@discordeno/')) file.dependencies[dependency] = file.version;
  });
}

await writeFile(`packages/${packageName}/package.json`, JSON.stringify(file, null, 2));

console.log(`Bumped ${packageName} to ${file.version}`);

function bumpPatch(version) {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error('Invalid semver format. Expected format "MAJOR.MINOR.PATCH"');
  }

  parts[2] += 1;
  return parts.join('.');
}
