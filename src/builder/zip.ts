import { BlobWriter, terminateWorkers, ZipWriter } from 'zip';
import { walk, WalkEntry } from 'std/fs/mod.ts';
import { relative, resolve } from 'std/path/mod.ts';

export async function zip(src: string, platform: string) {
  const zipFile = await Deno.open(`${platform}.zip`, {
    create: true,
    write: true,
  });

  let entries: WalkEntry[] = [];
  for await (const entry of walk(src)) {
    if (entry.isFile) {
      entry.name = relative(src, entry.path);
      entries = [...entries, entry];
    }
  }

  const blobWriter = new BlobWriter('application/zip');
  const zipWriter = new ZipWriter(blobWriter, { level: 9 });
  try {
    await Promise.all(entries.map((entry) => addFile(zipWriter, entry)));
    const blob = await zipWriter.close();
    await blob.stream().pipeTo(zipFile.writable);
  } finally {
    terminateWorkers();
  }
}

async function addFile(zipWriter: ZipWriter<Blob>, entry: WalkEntry) {
  try {
    const readable = await getReadable(entry);
    if (readable) {
      await zipWriter.add(entry.name, { readable }, { directory: false });
    }
  } catch (error) {
    console.error(`  error: ${error.message}, file: ${entry.path}`);
  }
}

async function getReadable(entry: WalkEntry) {
  return entry.isFile
    ? (await Deno.open(resolve(entry.path), { read: true })).readable
    : null;
}
