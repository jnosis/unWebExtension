import { zip } from './deps.ts';
import { fs } from './deps.ts';
import { path } from './deps.ts';

export async function compress(src: string, platform: string) {
  const zipFile = await Deno.open(`${platform}.zip`, {
    create: true,
    write: true,
  });

  let entries: fs.WalkEntry[] = [];
  for await (const entry of fs.walk(src)) {
    if (entry.isFile) {
      entry.name = path.relative(src, entry.path);
      entries = [...entries, entry];
    }
  }

  const blobWriter = new zip.BlobWriter('application/zip');
  const zipWriter = new zip.ZipWriter(blobWriter, { level: 9 });
  try {
    await Promise.all(entries.map((entry) => addFile(zipWriter, entry)));
    const blob = await zipWriter.close();
    await blob.stream().pipeTo(zipFile.writable);
  } finally {
    zip.terminateWorkers();
  }
}

async function addFile(zipWriter: zip.ZipWriter<Blob>, entry: fs.WalkEntry) {
  try {
    const readable = await getReadable(entry);
    if (readable) {
      await zipWriter.add(entry.name, { readable }, { directory: false });
    }
  } catch (error) {
    console.error(`  error: ${error.message}, file: ${entry.path}`);
  }
}

async function getReadable(entry: fs.WalkEntry) {
  return entry.isFile
    ? (await Deno.open(path.resolve(entry.path), { read: true })).readable
    : null;
}
