export function getDenoArgs() {
  let args: string[] = [];
  const { Deno } = globalThis;

  if (Deno?.version?.deno) {
    if ((Deno.permissions.querySync({ name: 'read' })).state === 'granted') {
      args = [...args, '--allow-read'];
    }

    if ((Deno.permissions.querySync({ name: 'write' })).state === 'granted') {
      args = [...args, '--allow-write'];
    }

    const allowNetJsr = Deno.permissions.querySync({
      name: 'net',
      host: 'jsr.io',
    });
    const allowNetGoogle = Deno.permissions.querySync({
      name: 'net',
      host: 'storage.googleapis.com',
    });
    const allowNetMozilla = Deno.permissions.querySync({
      name: 'net',
      host: 'blog.mozilla.org',
    });
    const allowNetGithub = Deno.permissions.querySync({
      name: 'net',
      host: 'raw.githubusercontent.com',
    });

    if (allowNetJsr || allowNetGoogle || allowNetMozilla || allowNetGithub) {
      const netArg = `--allow-net=${allowNetJsr && 'jsr.io,'}${
        allowNetGoogle && 'storage.googleapis.com,'
      }${allowNetMozilla && 'blog.mozilla.org,'}${
        allowNetGithub && 'raw.githubusercontent.com,'
      }`;
      args = [...args, netArg.slice(0, -1)];
    }
  }

  return args;
}
