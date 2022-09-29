/**
 * Some Code from https://github.com/gildas-lormeau/zip.js/blob/master/cli-deno/mc-zip.js
 */
import { BlobWriter, terminateWorkers, ZipWriter } from 'zip';
import { normalize, resolve } from 'std/path/mod.ts';

type Entry = {
  url: string;
  name: string;
  isFile?: boolean;
  isDirectory?: boolean;
};

export async function zip(src: string, dest: string) {
  const zipFile = await Deno.open(`${dest}.zip`, {
    create: true,
    write: true,
  });
  const srcInfo = await getFileInfo(src, src);
  const entries = [await addDirectories(srcInfo, srcInfo.url)].flat();

  const blobWriter = new BlobWriter('application/zip');
  const zipWriter = new ZipWriter(blobWriter, { level: 9 });
  try {
    await Promise.all(entries.map((file) => addFile(zipWriter, file)));
    const blob = await zipWriter.close();
    await blob.stream().pipeTo(zipFile.writable);
  } finally {
    terminateWorkers();
  }
}

async function addDirectories(
  file: Entry,
  srcURL: string,
): Promise<Entry | Entry[]> {
  if (file.isDirectory) {
    let result: Entry[] = [];
    for await (const entry of Deno.readDir(resolve(file.url))) {
      const fileInfo = await getFileInfo(file.url + '/' + entry.name, srcURL);
      if (entry.isFile) {
        result = [...result, fileInfo];
      } else if (entry.isDirectory) {
        result = [...result, await addDirectories(fileInfo, srcURL)].flat();
      }
    }
    return result.flat();
  } else {
    return file;
  }
}

async function addFile(zipWriter: ZipWriter<Blob>, file: Entry) {
  try {
    const readable = await getReadable(file);
    if (readable) {
      await zipWriter.add(file.name, { readable }, { directory: false });
    }
  } catch (error) {
    console.error(`  error: ${error.message}, file: ${file.url}`);
  }
}

async function getFileInfo(file: string, srcURL: string): Promise<Entry> {
  let isFile;
  let isDirectory;
  let name = file;
  const resolvedName = resolve(name);

  name = normalize(replaceSlashes(name));
  if (resolvedName) {
    name = cleanFilename(name);
    name = name.replace(cleanFilename(normalize(srcURL)), '');
    const stat = await Deno.stat(resolvedName);
    isFile = stat.isFile;
    isDirectory = stat.isDirectory;
  }
  console.log(name, file);

  return {
    url: file,
    name,
    isFile,
    isDirectory,
  };
}

function replaceSlashes(url: string): string {
  url = url.replace(/\\/g, '/');
  const match = url.match(/^(?:\/)?(.*?)(?:\/)?$/);
  if (match) {
    return match[1];
  } else {
    return url;
  }
}

function cleanFilename(name: string): string {
  const result = replaceSlashes(
    ('/' + name + '/').replace(/(\/|\\)+(\.+)(\/|\\)+/g, '/'),
  );
  if (result == name) {
    return result;
  } else {
    return cleanFilename(result);
  }
}
async function getReadable(file: Entry) {
  return file.isFile
    ? (await Deno.open(resolve(file.url), { read: true })).readable
    : null;
}
