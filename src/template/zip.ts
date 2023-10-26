export const zipTemplate = (name: string) => {
  return ZIP_SCRIPT.replaceAll('{name}', name);
};

const ZIP_SCRIPT = `const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const platform = process.argv[2];
const zipPath = path.join(__dirname, \`/{name}-\${platform}.zip\`);
const distPath = path.join(__dirname, '/dist');
console.log(\`Checking {name}-\${platform}.zip...\`);
fs.rm(zipPath, async (err) => {
  if (!err) {
    console.log(\`  Delete {name}-\${platform}.zip\`);
  }

  try {
    console.log(\`Checking \${distPath}...\`);
    await fs.promises.access(distPath, fs.constants.F_OK);

    console.log(\`Creating {name}-\${platform}.zip file...\`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      console.log('  Archive has been created.');
      console.log(\`  File size: \${archive.pointer()} total bytes\`);
    });

    archive.on('error', (error) => {
      throw error;
    });

    archive.pipe(output);
    archive.directory(distPath, '').finalize();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(\`  \${distPath} does not exist.\`);
    else throw error;
  }
});
`;
