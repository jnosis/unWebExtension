/* cSpell:disable */
export const packages = (name: string) => {
  return [PACKAGE_JSON.replace('{name}', name), PNPM_LOCK];
};

const PACKAGE_JSON = `{
  "name": "{name}",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "npm run dev",
    "dev": "webpack --env platform=chrome --watch",
    "build": "webpack --env platform=chrome",
    "prod": "webpack --env platform=chrome --env production",
    "clean": "rimraf dist *.zip",
    "zip": "node zip.js",
    "delete-zip": "rimraf *.zip",
    "dev:chrome": "webpack --env platform=chrome --watch",
    "build:chrome": "webpack --env platform=chrome",
    "prod:chrome": "webpack --env platform=chrome --env production",
    "dev:firefox": "webpack --env platform=firefox --watch",
    "build:firefox": "webpack --env platform=firefox",
    "prod:firefox": "webpack --env platform=firefox --env production",
    "dev:edge": "webpack --env platform=edge --watch",
    "build:edge": "webpack --env platform=edge",
    "prod:edge": "webpack --env platform=edge --env production",
    "dev:whale": "webpack --env platform=whale --watch",
    "build:whale": "webpack --env platform=whale",
    "prod:whale": "webpack --env platform=whale --env production"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "author": "",
  "license": "UNLICENSED",
  "bugs": {
    "url": ""
  },
  "homepage": "",
  "private": "true",
  "devDependencies": {
    "@types/chrome": "^0.0.246",
    "@types/firefox-webext-browser": "^111.0.2",
    "@types/naver-whale": "^0.0.4",
    "archiver": "^6.0.1",
    "copy-webpack-plugin": "^9.0.1",
    "ts-loader": "^9.5.0",
    "typescript": "^5.2.2",
    "webpack": "^5.76.0",
    "webpack-cli": "^4.8.0",
    "webpack-merge": "^5.8.0"
  }
}
`;

const PNPM_LOCK = `lockfileVersion: '6.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

devDependencies:
  '@types/chrome':
    specifier: ^0.0.246
    version: 0.0.246
  '@types/firefox-webext-browser':
    specifier: ^111.0.2
    version: 111.0.2
  '@types/naver-whale':
    specifier: ^0.0.4
    version: 0.0.4
  archiver:
    specifier: ^6.0.1
    version: 6.0.1
  copy-webpack-plugin:
    specifier: ^9.0.1
    version: 9.0.1(webpack@5.76.0)
  ts-loader:
    specifier: ^9.5.0
    version: 9.5.0(typescript@5.2.2)(webpack@5.76.0)
  typescript:
    specifier: ^5.2.2
    version: 5.2.2
  webpack:
    specifier: ^5.76.0
    version: 5.76.0(webpack-cli@4.8.0)
  webpack-cli:
    specifier: ^4.8.0
    version: 4.8.0(webpack@5.76.0)
  webpack-merge:
    specifier: ^5.8.0
    version: 5.8.0

packages:

  /@discoveryjs/json-ext@0.5.3:
    resolution: {integrity: sha512-Fxt+AfXgjMoin2maPIYzFZnQjAXjAL0PHscM5pRTtatFqB+vZxAM9tLp2Optnuw3QOQC40jTNeGYFOMvyf7v9g==}
    engines: {node: '>=10.0.0'}
    dev: true

  /@jridgewell/gen-mapping@0.3.2:
    resolution: {integrity: sha512-mh65xKQAzI6iBcFzwv28KVWSmCkdRBWoOh+bYQGW3+6OZvbbN3TqMGo5hqYxQniRcH9F2VZIoJCm4pa3BPDK/A==}
    engines: {node: '>=6.0.0'}
    dependencies:
      '@jridgewell/set-array': 1.1.2
      '@jridgewell/sourcemap-codec': 1.4.14
      '@jridgewell/trace-mapping': 0.3.14
    dev: true

  /@jridgewell/resolve-uri@3.1.0:
    resolution: {integrity: sha512-F2msla3tad+Mfht5cJq7LSXcdudKTWCVYUgw6pLFOOHSTtZlj6SWNYAp+AhuqLmWdBO2X5hPrLcu8cVP8fy28w==}
    engines: {node: '>=6.0.0'}
    dev: true

  /@jridgewell/set-array@1.1.2:
    resolution: {integrity: sha512-xnkseuNADM0gt2bs+BvhO0p78Mk762YnZdsuzFV018NoG1Sj1SCQvpSqa7XUaTam5vAGasABV9qXASMKnFMwMw==}
    engines: {node: '>=6.0.0'}
    dev: true

  /@jridgewell/source-map@0.3.2:
    resolution: {integrity: sha512-m7O9o2uR8k2ObDysZYzdfhb08VuEml5oWGiosa1VdaPZ/A6QyPkAJuwN0Q1lhULOf6B7MtQmHENS743hWtCrgw==}
    dependencies:
      '@jridgewell/gen-mapping': 0.3.2
      '@jridgewell/trace-mapping': 0.3.14
    dev: true

  /@jridgewell/sourcemap-codec@1.4.14:
    resolution: {integrity: sha512-XPSJHWmi394fuUuzDnGz1wiKqWfo1yXecHQMRf2l6hztTO+nPru658AyDngaBe7isIxEkRsPR3FZh+s7iVa4Uw==}
    dev: true

  /@jridgewell/trace-mapping@0.3.14:
    resolution: {integrity: sha512-bJWEfQ9lPTvm3SneWwRFVLzrh6nhjwqw7TUFFBEMzwvg7t7PCDenf2lDwqo4NQXzdpgBXyFgDWnQA+2vkruksQ==}
    dependencies:
      '@jridgewell/resolve-uri': 3.1.0
      '@jridgewell/sourcemap-codec': 1.4.14
    dev: true

  /@nodelib/fs.scandir@2.1.5:
    resolution: {integrity: sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==}
    engines: {node: '>= 8'}
    dependencies:
      '@nodelib/fs.stat': 2.0.5
      run-parallel: 1.2.0
    dev: true

  /@nodelib/fs.stat@2.0.5:
    resolution: {integrity: sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==}
    engines: {node: '>= 8'}
    dev: true

  /@nodelib/fs.walk@1.2.8:
    resolution: {integrity: sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==}
    engines: {node: '>= 8'}
    dependencies:
      '@nodelib/fs.scandir': 2.1.5
      fastq: 1.11.1
    dev: true

  /@types/chrome@0.0.246:
    resolution: {integrity: sha512-MxGxEomGxsJiL9xe/7ZwVgwdn8XVKWbPvxpVQl3nWOjrS0Ce63JsfzxUc4aU3GvRcUPYsfufHmJ17BFyKxeA4g==}
    dependencies:
      '@types/filesystem': 0.0.33
      '@types/har-format': 1.2.13
    dev: true

  /@types/eslint-scope@3.7.4:
    resolution: {integrity: sha512-9K4zoImiZc3HlIp6AVUDE4CWYx22a+lhSZMYNpbjW04+YF0KWj4pJXnEMjdnFTiQibFFmElcsasJXDbdI/EPhA==}
    dependencies:
      '@types/eslint': 8.37.0
      '@types/estree': 0.0.51
    dev: true

  /@types/eslint@8.37.0:
    resolution: {integrity: sha512-Piet7dG2JBuDIfohBngQ3rCt7MgO9xCO4xIMKxBThCq5PNRB91IjlJ10eJVwfoNtvTErmxLzwBZ7rHZtbOMmFQ==}
    dependencies:
      '@types/estree': 0.0.51
      '@types/json-schema': 7.0.9
    dev: true

  /@types/estree@0.0.51:
    resolution: {integrity: sha512-CuPgU6f3eT/XgKKPqKd/gLZV1Xmvf1a2R5POBOGQa6uv82xpls89HU5zKeVoyR8XzHd1RGNOlQlvUe3CFkjWNQ==}
    dev: true

  /@types/filesystem@0.0.33:
    resolution: {integrity: sha512-2KedRPzwu2K528vFkoXnnWdsG0MtUwPjuA7pRy4vKxlxHEe8qUDZibYHXJKZZr2Cl/ELdCWYqyb/MKwsUuzBWw==}
    dependencies:
      '@types/filewriter': 0.0.30
    dev: true

  /@types/filewriter@0.0.30:
    resolution: {integrity: sha512-lB98tui0uxc7erbj0serZfJlHKLNJHwBltPnbmO1WRpL5T325GOHRiQfr2E29V2q+S1brDO63Fpdt6vb3bES9Q==}
    dev: true

  /@types/firefox-webext-browser@111.0.2:
    resolution: {integrity: sha512-NS7izfYOnQI/Opf3YdZSKkI5Ox89SqEffJHK2zfGY2BYEVuWuM6pSwDRglGl4W0SM84oUQfvLyYH4X6EQZAJ2w==}
    dev: true

  /@types/har-format@1.2.13:
    resolution: {integrity: sha512-PwBsCBD3lDODn4xpje3Y1di0aDJp4Ww7aSfMRVw6ysnxD4I7Wmq2mBkSKaDtN403hqH5sp6c9xQUvFYY3+lkBg==}
    dev: true

  /@types/json-schema@7.0.9:
    resolution: {integrity: sha512-qcUXuemtEu+E5wZSJHNxUXeCZhAfXKQ41D+duX+VYPde7xyEVZci+/oXKJL13tnRs9lR2pr4fod59GT6/X1/yQ==}
    dev: true

  /@types/naver-whale@0.0.4:
    resolution: {integrity: sha512-Ax7pMo+Vp7y3FLDuDXWefeTmmWjKFXbFLEOa9FdyBMw/J0RkJdHQKcNNcm9GjqvXBQYWYuDxR9R6Hb1hEF8/lg==}
    dependencies:
      '@types/chrome': 0.0.246
    dev: true

  /@types/node@16.4.10:
    resolution: {integrity: sha512-TmVHsm43br64js9BqHWqiDZA+xMtbUpI1MBIA0EyiBmoV9pcEYFOSdj5fr6enZNfh4fChh+AGOLIzGwJnkshyQ==}
    dev: true

  /@webassemblyjs/ast@1.11.1:
    resolution: {integrity: sha512-ukBh14qFLjxTQNTXocdyksN5QdM28S1CxHt2rdskFyL+xFV7VremuBLVbmCePj+URalXBENx/9Lm7lnhihtCSw==}
    dependencies:
      '@webassemblyjs/helper-numbers': 1.11.1
      '@webassemblyjs/helper-wasm-bytecode': 1.11.1
    dev: true

  /@webassemblyjs/floating-point-hex-parser@1.11.1:
    resolution: {integrity: sha512-iGRfyc5Bq+NnNuX8b5hwBrRjzf0ocrJPI6GWFodBFzmFnyvrQ83SHKhmilCU/8Jv67i4GJZBMhEzltxzcNagtQ==}
    dev: true

  /@webassemblyjs/helper-api-error@1.11.1:
    resolution: {integrity: sha512-RlhS8CBCXfRUR/cwo2ho9bkheSXG0+NwooXcc3PAILALf2QLdFyj7KGsKRbVc95hZnhnERon4kW/D3SZpp6Tcg==}
    dev: true

  /@webassemblyjs/helper-buffer@1.11.1:
    resolution: {integrity: sha512-gwikF65aDNeeXa8JxXa2BAk+REjSyhrNC9ZwdT0f8jc4dQQeDQ7G4m0f2QCLPJiMTTO6wfDmRmj/pW0PsUvIcA==}
    dev: true

  /@webassemblyjs/helper-numbers@1.11.1:
    resolution: {integrity: sha512-vDkbxiB8zfnPdNK9Rajcey5C0w+QJugEglN0of+kmO8l7lDb77AnlKYQF7aarZuCrv+l0UvqL+68gSDr3k9LPQ==}
    dependencies:
      '@webassemblyjs/floating-point-hex-parser': 1.11.1
      '@webassemblyjs/helper-api-error': 1.11.1
      '@xtuc/long': 4.2.2
    dev: true

  /@webassemblyjs/helper-wasm-bytecode@1.11.1:
    resolution: {integrity: sha512-PvpoOGiJwXeTrSf/qfudJhwlvDQxFgelbMqtq52WWiXC6Xgg1IREdngmPN3bs4RoO83PnL/nFrxucXj1+BX62Q==}
    dev: true

  /@webassemblyjs/helper-wasm-section@1.11.1:
    resolution: {integrity: sha512-10P9No29rYX1j7F3EVPX3JvGPQPae+AomuSTPiF9eBQeChHI6iqjMIwR9JmOJXwpnn/oVGDk7I5IlskuMwU/pg==}
    dependencies:
      '@webassemblyjs/ast': 1.11.1
      '@webassemblyjs/helper-buffer': 1.11.1
      '@webassemblyjs/helper-wasm-bytecode': 1.11.1
      '@webassemblyjs/wasm-gen': 1.11.1
    dev: true

  /@webassemblyjs/ieee754@1.11.1:
    resolution: {integrity: sha512-hJ87QIPtAMKbFq6CGTkZYJivEwZDbQUgYd3qKSadTNOhVY7p+gfP6Sr0lLRVTaG1JjFj+r3YchoqRYxNH3M0GQ==}
    dependencies:
      '@xtuc/ieee754': 1.2.0
    dev: true

  /@webassemblyjs/leb128@1.11.1:
    resolution: {integrity: sha512-BJ2P0hNZ0u+Th1YZXJpzW6miwqQUGcIHT1G/sf72gLVD9DZ5AdYTqPNbHZh6K1M5VmKvFXwGSWZADz+qBWxeRw==}
    dependencies:
      '@xtuc/long': 4.2.2
    dev: true

  /@webassemblyjs/utf8@1.11.1:
    resolution: {integrity: sha512-9kqcxAEdMhiwQkHpkNiorZzqpGrodQQ2IGrHHxCy+Ozng0ofyMA0lTqiLkVs1uzTRejX+/O0EOT7KxqVPuXosQ==}
    dev: true

  /@webassemblyjs/wasm-edit@1.11.1:
    resolution: {integrity: sha512-g+RsupUC1aTHfR8CDgnsVRVZFJqdkFHpsHMfJuWQzWU3tvnLC07UqHICfP+4XyL2tnr1amvl1Sdp06TnYCmVkA==}
    dependencies:
      '@webassemblyjs/ast': 1.11.1
      '@webassemblyjs/helper-buffer': 1.11.1
      '@webassemblyjs/helper-wasm-bytecode': 1.11.1
      '@webassemblyjs/helper-wasm-section': 1.11.1
      '@webassemblyjs/wasm-gen': 1.11.1
      '@webassemblyjs/wasm-opt': 1.11.1
      '@webassemblyjs/wasm-parser': 1.11.1
      '@webassemblyjs/wast-printer': 1.11.1
    dev: true

  /@webassemblyjs/wasm-gen@1.11.1:
    resolution: {integrity: sha512-F7QqKXwwNlMmsulj6+O7r4mmtAlCWfO/0HdgOxSklZfQcDu0TpLiD1mRt/zF25Bk59FIjEuGAIyn5ei4yMfLhA==}
    dependencies:
      '@webassemblyjs/ast': 1.11.1
      '@webassemblyjs/helper-wasm-bytecode': 1.11.1
      '@webassemblyjs/ieee754': 1.11.1
      '@webassemblyjs/leb128': 1.11.1
      '@webassemblyjs/utf8': 1.11.1
    dev: true

  /@webassemblyjs/wasm-opt@1.11.1:
    resolution: {integrity: sha512-VqnkNqnZlU5EB64pp1l7hdm3hmQw7Vgqa0KF/KCNO9sIpI6Fk6brDEiX+iCOYrvMuBWDws0NkTOxYEb85XQHHw==}
    dependencies:
      '@webassemblyjs/ast': 1.11.1
      '@webassemblyjs/helper-buffer': 1.11.1
      '@webassemblyjs/wasm-gen': 1.11.1
      '@webassemblyjs/wasm-parser': 1.11.1
    dev: true

  /@webassemblyjs/wasm-parser@1.11.1:
    resolution: {integrity: sha512-rrBujw+dJu32gYB7/Lup6UhdkPx9S9SnobZzRVL7VcBH9Bt9bCBLEuX/YXOOtBsOZ4NQrRykKhffRWHvigQvOA==}
    dependencies:
      '@webassemblyjs/ast': 1.11.1
      '@webassemblyjs/helper-api-error': 1.11.1
      '@webassemblyjs/helper-wasm-bytecode': 1.11.1
      '@webassemblyjs/ieee754': 1.11.1
      '@webassemblyjs/leb128': 1.11.1
      '@webassemblyjs/utf8': 1.11.1
    dev: true

  /@webassemblyjs/wast-printer@1.11.1:
    resolution: {integrity: sha512-IQboUWM4eKzWW+N/jij2sRatKMh99QEelo3Eb2q0qXkvPRISAj8Qxtmw5itwqK+TTkBuUIE45AxYPToqPtL5gg==}
    dependencies:
      '@webassemblyjs/ast': 1.11.1
      '@xtuc/long': 4.2.2
    dev: true

  /@webpack-cli/configtest@1.0.4(webpack-cli@4.8.0)(webpack@5.76.0):
    resolution: {integrity: sha512-cs3XLy+UcxiP6bj0A6u7MLLuwdXJ1c3Dtc0RkKg+wiI1g/Ti1om8+/2hc2A2B60NbBNAbMgyBMHvyymWm/j4wQ==}
    peerDependencies:
      webpack: 4.x.x || 5.x.x
      webpack-cli: 4.x.x
    dependencies:
      webpack: 5.76.0(webpack-cli@4.8.0)
      webpack-cli: 4.8.0(webpack@5.76.0)
    dev: true

  /@webpack-cli/info@1.3.0(webpack-cli@4.8.0):
    resolution: {integrity: sha512-ASiVB3t9LOKHs5DyVUcxpraBXDOKubYu/ihHhU+t1UPpxsivg6Od2E2qU4gJCekfEddzRBzHhzA/Acyw/mlK/w==}
    peerDependencies:
      webpack-cli: 4.x.x
    dependencies:
      envinfo: 7.8.1
      webpack-cli: 4.8.0(webpack@5.76.0)
    dev: true

  /@webpack-cli/serve@1.5.2(webpack-cli@4.8.0):
    resolution: {integrity: sha512-vgJ5OLWadI8aKjDlOH3rb+dYyPd2GTZuQC/Tihjct6F9GpXGZINo3Y/IVuZVTM1eDQB+/AOsjPUWH/WySDaXvw==}
    peerDependencies:
      webpack-cli: 4.x.x
      webpack-dev-server: '*'
    peerDependenciesMeta:
      webpack-dev-server:
        optional: true
    dependencies:
      webpack-cli: 4.8.0(webpack@5.76.0)
    dev: true

  /@xtuc/ieee754@1.2.0:
    resolution: {integrity: sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA==}
    dev: true

  /@xtuc/long@4.2.2:
    resolution: {integrity: sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ==}
    dev: true

  /acorn-import-assertions@1.7.6(acorn@8.8.0):
    resolution: {integrity: sha512-FlVvVFA1TX6l3lp8VjDnYYq7R1nyW6x3svAt4nDgrWQ9SBaSh9CnbwgSUTasgfNfOG5HlM1ehugCvM+hjo56LA==}
    peerDependencies:
      acorn: ^8
    dependencies:
      acorn: 8.8.0
    dev: true

  /acorn@8.8.0:
    resolution: {integrity: sha512-QOxyigPVrpZ2GXT+PFyZTl6TtOFc5egxHIP9IlQ+RbupQuX4RkT/Bee4/kQuC02Xkzg84JcT7oLYtDIQxp+v7w==}
    engines: {node: '>=0.4.0'}
    hasBin: true
    dev: true

  /ajv-keywords@3.5.2(ajv@6.12.6):
    resolution: {integrity: sha512-5p6WTN0DdTGVQk6VjcEju19IgaHudalcfabD7yhDGeA6bcQnmL+CpveLJq/3hvfwd1aof6L386Ougkx6RfyMIQ==}
    peerDependencies:
      ajv: ^6.9.1
    dependencies:
      ajv: 6.12.6
    dev: true

  /ajv@6.12.6:
    resolution: {integrity: sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==}
    dependencies:
      fast-deep-equal: 3.1.3
      fast-json-stable-stringify: 2.1.0
      json-schema-traverse: 0.4.1
      uri-js: 4.4.1
    dev: true

  /ansi-styles@4.3.0:
    resolution: {integrity: sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==}
    engines: {node: '>=8'}
    dependencies:
      color-convert: 2.0.1
    dev: true

  /archiver-utils@4.0.1:
    resolution: {integrity: sha512-Q4Q99idbvzmgCTEAAhi32BkOyq8iVI5EwdO0PmBDSGIzzjYNdcFn7Q7k3OzbLy4kLUPXfJtG6fO2RjftXbobBg==}
    engines: {node: '>= 12.0.0'}
    dependencies:
      glob: 8.1.0
      graceful-fs: 4.2.11
      lazystream: 1.0.1
      lodash: 4.17.21
      normalize-path: 3.0.0
      readable-stream: 3.6.2
    dev: true

  /archiver@6.0.1:
    resolution: {integrity: sha512-CXGy4poOLBKptiZH//VlWdFuUC1RESbdZjGjILwBuZ73P7WkAUN0htfSfBq/7k6FRFlpu7bg4JOkj1vU9G6jcQ==}
    engines: {node: '>= 12.0.0'}
    dependencies:
      archiver-utils: 4.0.1
      async: 3.2.4
      buffer-crc32: 0.2.13
      readable-stream: 3.6.2
      readdir-glob: 1.1.3
      tar-stream: 3.1.6
      zip-stream: 5.0.1
    dev: true

  /array-union@2.1.0:
    resolution: {integrity: sha512-HGyxoOTYUyCM6stUe6EJgnd4EoewAI7zMdfqO+kGjnlZmBDz/cR5pf8r/cR4Wq60sL/p0IkcjUEEPwS3GFrIyw==}
    engines: {node: '>=8'}
    dev: true

  /async@3.2.4:
    resolution: {integrity: sha512-iAB+JbDEGXhyIUavoDl9WP/Jj106Kz9DEn1DPgYw5ruDn0e3Wgi3sKFm55sASdGBNOQB8F59d9qQ7deqrHA8wQ==}
    dev: true

  /b4a@1.6.4:
    resolution: {integrity: sha512-fpWrvyVHEKyeEvbKZTVOeZF3VSKKWtJxFIxX/jaVPf+cLbGUSitjb49pHLqPV2BUNNZ0LcoeEGfE/YCpyDYHIw==}
    dev: true

  /balanced-match@1.0.2:
    resolution: {integrity: sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==}
    dev: true

  /brace-expansion@2.0.1:
    resolution: {integrity: sha512-XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==}
    dependencies:
      balanced-match: 1.0.2
    dev: true

  /braces@3.0.2:
    resolution: {integrity: sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==}
    engines: {node: '>=8'}
    dependencies:
      fill-range: 7.0.1
    dev: true

  /browserslist@4.16.7:
    resolution: {integrity: sha512-7I4qVwqZltJ7j37wObBe3SoTz+nS8APaNcrBOlgoirb6/HbEU2XxW/LpUDTCngM6iauwFqmRTuOMfyKnFGY5JA==}
    engines: {node: ^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7}
    hasBin: true
    dependencies:
      caniuse-lite: 1.0.30001248
      colorette: 1.2.2
      electron-to-chromium: 1.3.793
      escalade: 3.1.1
      node-releases: 1.1.73
    dev: true

  /buffer-crc32@0.2.13:
    resolution: {integrity: sha512-VO9Ht/+p3SN7SKWqcrgEzjGbRSJYTx+Q1pTQC0wrWqHx0vpJraQ6GtHx8tvcg1rlK1byhU5gccxgOgj7B0TDkQ==}
    dev: true

  /buffer-from@1.1.2:
    resolution: {integrity: sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==}
    dev: true

  /caniuse-lite@1.0.30001248:
    resolution: {integrity: sha512-NwlQbJkxUFJ8nMErnGtT0QTM2TJ33xgz4KXJSMIrjXIbDVdaYueGyjOrLKRtJC+rTiWfi6j5cnZN1NBiSBJGNw==}
    dev: true

  /chalk@4.1.2:
    resolution: {integrity: sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==}
    engines: {node: '>=10'}
    dependencies:
      ansi-styles: 4.3.0
      supports-color: 7.2.0
    dev: true

  /chrome-trace-event@1.0.3:
    resolution: {integrity: sha512-p3KULyQg4S7NIHixdwbGX+nFHkoBiA4YQmyWtjb8XngSKV124nJmRysgAeujbUVb15vh+RvFUfCPqU7rXk+hZg==}
    engines: {node: '>=6.0'}
    dev: true

  /clone-deep@4.0.1:
    resolution: {integrity: sha512-neHB9xuzh/wk0dIHweyAXv2aPGZIVk3pLMe+/RNzINf17fe0OG96QroktYAUm7SM1PBnzTabaLboqqxDyMU+SQ==}
    engines: {node: '>=6'}
    dependencies:
      is-plain-object: 2.0.4
      kind-of: 6.0.3
      shallow-clone: 3.0.1
    dev: true

  /color-convert@2.0.1:
    resolution: {integrity: sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==}
    engines: {node: '>=7.0.0'}
    dependencies:
      color-name: 1.1.4
    dev: true

  /color-name@1.1.4:
    resolution: {integrity: sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==}
    dev: true

  /colorette@1.2.2:
    resolution: {integrity: sha512-MKGMzyfeuutC/ZJ1cba9NqcNpfeqMUcYmyF1ZFY6/Cn7CNSAKx6a+s48sqLqyAiZuaP2TcqMhoo+dlwFnVxT9w==}
    dev: true

  /commander@2.20.3:
    resolution: {integrity: sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ==}
    dev: true

  /commander@7.2.0:
    resolution: {integrity: sha512-QrWXB+ZQSVPmIWIhtEO9H+gwHaMGYiF5ChvoJ+K9ZGHG/sVsa6yiesAD1GC/x46sET00Xlwo1u49RVVVzvcSkw==}
    engines: {node: '>= 10'}
    dev: true

  /compress-commons@5.0.1:
    resolution: {integrity: sha512-MPh//1cERdLtqwO3pOFLeXtpuai0Y2WCd5AhtKxznqM7WtaMYaOEMSgn45d9D10sIHSfIKE603HlOp8OPGrvag==}
    engines: {node: '>= 12.0.0'}
    dependencies:
      crc-32: 1.2.2
      crc32-stream: 5.0.0
      normalize-path: 3.0.0
      readable-stream: 3.6.2
    dev: true

  /copy-webpack-plugin@9.0.1(webpack@5.76.0):
    resolution: {integrity: sha512-14gHKKdYIxF84jCEgPgYXCPpldbwpxxLbCmA7LReY7gvbaT555DgeBWBgBZM116tv/fO6RRJrsivBqRyRlukhw==}
    engines: {node: '>= 12.13.0'}
    peerDependencies:
      webpack: ^5.1.0
    dependencies:
      fast-glob: 3.2.7
      glob-parent: 6.0.1
      globby: 11.0.4
      normalize-path: 3.0.0
      p-limit: 3.1.0
      schema-utils: 3.1.1
      serialize-javascript: 6.0.0
      webpack: 5.76.0(webpack-cli@4.8.0)
    dev: true

  /core-util-is@1.0.3:
    resolution: {integrity: sha512-ZQBvi1DcpJ4GDqanjucZ2Hj3wEO5pZDS89BWbkcrvdxksJorwUDDZamX9ldFkp9aw2lmBDLgkObEA4DWNJ9FYQ==}
    dev: true

  /crc-32@1.2.2:
    resolution: {integrity: sha512-ROmzCKrTnOwybPcJApAA6WBWij23HVfGVNKqqrZpuyZOHqK2CwHSvpGuyt/UNNvaIjEd8X5IFGp4Mh+Ie1IHJQ==}
    engines: {node: '>=0.8'}
    hasBin: true
    dev: true

  /crc32-stream@5.0.0:
    resolution: {integrity: sha512-B0EPa1UK+qnpBZpG+7FgPCu0J2ETLpXq09o9BkLkEAhdB6Z61Qo4pJ3JYu0c+Qi+/SAL7QThqnzS06pmSSyZaw==}
    engines: {node: '>= 12.0.0'}
    dependencies:
      crc-32: 1.2.2
      readable-stream: 3.6.2
    dev: true

  /cross-spawn@7.0.3:
    resolution: {integrity: sha512-iRDPJKUPVEND7dHPO8rkbOnPpyDygcDFtWjpeWNCgy8WP2rXcxXL8TskReQl6OrB2G7+UJrags1q15Fudc7G6w==}
    engines: {node: '>= 8'}
    dependencies:
      path-key: 3.1.1
      shebang-command: 2.0.0
      which: 2.0.2
    dev: true

  /dir-glob@3.0.1:
    resolution: {integrity: sha512-WkrWp9GR4KXfKGYzOLmTuGVi1UWFfws377n9cc55/tb6DuqyF6pcQ5AbiHEshaDpY9v6oaSr2XCDidGmMwdzIA==}
    engines: {node: '>=8'}
    dependencies:
      path-type: 4.0.0
    dev: true

  /electron-to-chromium@1.3.793:
    resolution: {integrity: sha512-l9NrGV6Mr4ov5mayYPvIWcwklNw5ROmy6rllzz9dCACw9nKE5y+s5uQk+CBJMetxrWZ6QJFsvEfG6WDcH2IGUg==}
    dev: true

  /enhanced-resolve@5.15.0:
    resolution: {integrity: sha512-LXYT42KJ7lpIKECr2mAXIaMldcNCh/7E0KBKOu4KSfkHmP+mZmSs+8V5gBAqisWBy0OO4W5Oyys0GO1Y8KtdKg==}
    engines: {node: '>=10.13.0'}
    dependencies:
      graceful-fs: 4.2.11
      tapable: 2.2.1
    dev: true

  /envinfo@7.8.1:
    resolution: {integrity: sha512-/o+BXHmB7ocbHEAs6F2EnG0ogybVVUdkRunTT2glZU9XAaGmhqskrvKwqXuDfNjEO0LZKWdejEEpnq8aM0tOaw==}
    engines: {node: '>=4'}
    hasBin: true
    dev: true

  /es-module-lexer@0.9.3:
    resolution: {integrity: sha512-1HQ2M2sPtxwnvOvT1ZClHyQDiggdNjURWpY2we6aMKCQiUVxTmVs2UYPLIrD84sS+kMdUwfBSylbJPwNnBrnHQ==}
    dev: true

  /escalade@3.1.1:
    resolution: {integrity: sha512-k0er2gUkLf8O0zKJiAhmkTnJlTvINGv7ygDNPbeIsX/TJjGJZHuh9B2UxbsaEkmlEo9MfhrSzmhIlhRlI2GXnw==}
    engines: {node: '>=6'}
    dev: true

  /eslint-scope@5.1.1:
    resolution: {integrity: sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==}
    engines: {node: '>=8.0.0'}
    dependencies:
      esrecurse: 4.3.0
      estraverse: 4.3.0
    dev: true

  /esrecurse@4.3.0:
    resolution: {integrity: sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==}
    engines: {node: '>=4.0'}
    dependencies:
      estraverse: 5.2.0
    dev: true

  /estraverse@4.3.0:
    resolution: {integrity: sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==}
    engines: {node: '>=4.0'}
    dev: true

  /estraverse@5.2.0:
    resolution: {integrity: sha512-BxbNGGNm0RyRYvUdHpIwv9IWzeM9XClbOxwoATuFdOE7ZE6wHL+HQ5T8hoPM+zHvmKzzsEqhgy0GrQ5X13afiQ==}
    engines: {node: '>=4.0'}
    dev: true

  /events@3.3.0:
    resolution: {integrity: sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==}
    engines: {node: '>=0.8.x'}
    dev: true

  /execa@5.1.1:
    resolution: {integrity: sha512-8uSpZZocAZRBAPIEINJj3Lo9HyGitllczc27Eh5YYojjMFMn8yHMDMaUHE2Jqfq05D/wucwI4JGURyXt1vchyg==}
    engines: {node: '>=10'}
    dependencies:
      cross-spawn: 7.0.3
      get-stream: 6.0.1
      human-signals: 2.1.0
      is-stream: 2.0.1
      merge-stream: 2.0.0
      npm-run-path: 4.0.1
      onetime: 5.1.2
      signal-exit: 3.0.3
      strip-final-newline: 2.0.0
    dev: true

  /fast-deep-equal@3.1.3:
    resolution: {integrity: sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==}
    dev: true

  /fast-fifo@1.3.2:
    resolution: {integrity: sha512-/d9sfos4yxzpwkDkuN7k2SqFKtYNmCTzgfEpz82x34IM9/zc8KGxQoXg1liNC/izpRM/MBdt44Nmx41ZWqk+FQ==}
    dev: true

  /fast-glob@3.2.7:
    resolution: {integrity: sha512-rYGMRwip6lUMvYD3BTScMwT1HtAs2d71SMv66Vrxs0IekGZEjhM0pcMfjQPnknBt2zeCwQMEupiN02ZP4DiT1Q==}
    engines: {node: '>=8'}
    dependencies:
      '@nodelib/fs.stat': 2.0.5
      '@nodelib/fs.walk': 1.2.8
      glob-parent: 5.1.2
      merge2: 1.4.1
      micromatch: 4.0.5
    dev: true

  /fast-json-stable-stringify@2.1.0:
    resolution: {integrity: sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==}
    dev: true

  /fastest-levenshtein@1.0.12:
    resolution: {integrity: sha512-On2N+BpYJ15xIC974QNVuYGMOlEVt4s0EOI3wwMqOmK1fdDY+FN/zltPV8vosq4ad4c/gJ1KHScUn/6AWIgiow==}
    dev: true

  /fastq@1.11.1:
    resolution: {integrity: sha512-HOnr8Mc60eNYl1gzwp6r5RoUyAn5/glBolUzP/Ez6IFVPMPirxn/9phgL6zhOtaTy7ISwPvQ+wT+hfcRZh/bzw==}
    dependencies:
      reusify: 1.0.4
    dev: true

  /fill-range@7.0.1:
    resolution: {integrity: sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==}
    engines: {node: '>=8'}
    dependencies:
      to-regex-range: 5.0.1
    dev: true

  /find-up@4.1.0:
    resolution: {integrity: sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==}
    engines: {node: '>=8'}
    dependencies:
      locate-path: 5.0.0
      path-exists: 4.0.0
    dev: true

  /fs.realpath@1.0.0:
    resolution: {integrity: sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==}
    dev: true

  /function-bind@1.1.1:
    resolution: {integrity: sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A==}
    dev: true

  /get-stream@6.0.1:
    resolution: {integrity: sha512-ts6Wi+2j3jQjqi70w5AlN8DFnkSwC+MqmxEzdEALB2qXZYV3X/b1CTfgPLGJNMeAWxdPfU8FO1ms3NUfaHCPYg==}
    engines: {node: '>=10'}
    dev: true

  /glob-parent@5.1.2:
    resolution: {integrity: sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==}
    engines: {node: '>= 6'}
    dependencies:
      is-glob: 4.0.1
    dev: true

  /glob-parent@6.0.1:
    resolution: {integrity: sha512-kEVjS71mQazDBHKcsq4E9u/vUzaLcw1A8EtUeydawvIWQCJM0qQ08G1H7/XTjFUulla6XQiDOG6MXSaG0HDKog==}
    engines: {node: '>=10.13.0'}
    dependencies:
      is-glob: 4.0.1
    dev: true

  /glob-to-regexp@0.4.1:
    resolution: {integrity: sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw==}
    dev: true

  /glob@8.1.0:
    resolution: {integrity: sha512-r8hpEjiQEYlF2QU0df3dS+nxxSIreXQS1qRhMJM0Q5NDdR386C7jb7Hwwod8Fgiuex+k0GFjgft18yvxm5XoCQ==}
    engines: {node: '>=12'}
    dependencies:
      fs.realpath: 1.0.0
      inflight: 1.0.6
      inherits: 2.0.4
      minimatch: 5.1.6
      once: 1.4.0
    dev: true

  /globby@11.0.4:
    resolution: {integrity: sha512-9O4MVG9ioZJ08ffbcyVYyLOJLk5JQ688pJ4eMGLpdWLHq/Wr1D9BlriLQyL0E+jbkuePVZXYFj47QM/v093wHg==}
    engines: {node: '>=10'}
    dependencies:
      array-union: 2.1.0
      dir-glob: 3.0.1
      fast-glob: 3.2.7
      ignore: 5.1.8
      merge2: 1.4.1
      slash: 3.0.0
    dev: true

  /graceful-fs@4.2.11:
    resolution: {integrity: sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==}
    dev: true

  /has-flag@4.0.0:
    resolution: {integrity: sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==}
    engines: {node: '>=8'}
    dev: true

  /has@1.0.3:
    resolution: {integrity: sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==}
    engines: {node: '>= 0.4.0'}
    dependencies:
      function-bind: 1.1.1
    dev: true

  /human-signals@2.1.0:
    resolution: {integrity: sha512-B4FFZ6q/T2jhhksgkbEW3HBvWIfDW85snkQgawt07S7J5QXTk6BkNV+0yAeZrM5QpMAdYlocGoljn0sJ/WQkFw==}
    engines: {node: '>=10.17.0'}
    dev: true

  /ignore@5.1.8:
    resolution: {integrity: sha512-BMpfD7PpiETpBl/A6S498BaIJ6Y/ABT93ETbby2fP00v4EbvPBXWEoaR1UBPKs3iR53pJY7EtZk5KACI57i1Uw==}
    engines: {node: '>= 4'}
    dev: true

  /import-local@3.0.2:
    resolution: {integrity: sha512-vjL3+w0oulAVZ0hBHnxa/Nm5TAurf9YLQJDhqRZyqb+VKGOB6LU8t9H1Nr5CIo16vh9XfJTOoHwU0B71S557gA==}
    engines: {node: '>=8'}
    hasBin: true
    dependencies:
      pkg-dir: 4.2.0
      resolve-cwd: 3.0.0
    dev: true

  /inflight@1.0.6:
    resolution: {integrity: sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==}
    dependencies:
      once: 1.4.0
      wrappy: 1.0.2
    dev: true

  /inherits@2.0.4:
    resolution: {integrity: sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==}
    dev: true

  /interpret@2.2.0:
    resolution: {integrity: sha512-Ju0Bz/cEia55xDwUWEa8+olFpCiQoypjnQySseKtmjNrnps3P+xfpUmGr90T7yjlVJmOtybRvPXhKMbHr+fWnw==}
    engines: {node: '>= 0.10'}
    dev: true

  /is-core-module@2.5.0:
    resolution: {integrity: sha512-TXCMSDsEHMEEZ6eCA8rwRDbLu55MRGmrctljsBX/2v1d9/GzqHOxW5c5oPSgrUt2vBFXebu9rGqckXGPWOlYpg==}
    dependencies:
      has: 1.0.3
    dev: true

  /is-extglob@2.1.1:
    resolution: {integrity: sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==}
    engines: {node: '>=0.10.0'}
    dev: true

  /is-glob@4.0.1:
    resolution: {integrity: sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==}
    engines: {node: '>=0.10.0'}
    dependencies:
      is-extglob: 2.1.1
    dev: true

  /is-number@7.0.0:
    resolution: {integrity: sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==}
    engines: {node: '>=0.12.0'}
    dev: true

  /is-plain-object@2.0.4:
    resolution: {integrity: sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==}
    engines: {node: '>=0.10.0'}
    dependencies:
      isobject: 3.0.1
    dev: true

  /is-stream@2.0.1:
    resolution: {integrity: sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg==}
    engines: {node: '>=8'}
    dev: true

  /isarray@1.0.0:
    resolution: {integrity: sha512-VLghIWNM6ELQzo7zwmcg0NmTVyWKYjvIeM83yjp0wRDTmUnrM678fQbcKBo6n2CJEF0szoG//ytg+TKla89ALQ==}
    dev: true

  /isexe@2.0.0:
    resolution: {integrity: sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==}
    dev: true

  /isobject@3.0.1:
    resolution: {integrity: sha512-WhB9zCku7EGTj/HQQRz5aUQEUeoQZH2bWcltRErOpymJ4boYE6wL9Tbr23krRPSZ+C5zqNSrSw+Cc7sZZ4b7vg==}
    engines: {node: '>=0.10.0'}
    dev: true

  /jest-worker@27.0.6:
    resolution: {integrity: sha512-qupxcj/dRuA3xHPMUd40gr2EaAurFbkwzOh7wfPaeE9id7hyjURRQoqNfHifHK3XjJU6YJJUQKILGUnwGPEOCA==}
    engines: {node: '>= 10.13.0'}
    dependencies:
      '@types/node': 16.4.10
      merge-stream: 2.0.0
      supports-color: 8.1.1
    dev: true

  /json-parse-even-better-errors@2.3.1:
    resolution: {integrity: sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==}
    dev: true

  /json-schema-traverse@0.4.1:
    resolution: {integrity: sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==}
    dev: true

  /kind-of@6.0.3:
    resolution: {integrity: sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==}
    engines: {node: '>=0.10.0'}
    dev: true

  /lazystream@1.0.1:
    resolution: {integrity: sha512-b94GiNHQNy6JNTrt5w6zNyffMrNkXZb3KTkCZJb2V1xaEGCk093vkZ2jk3tpaeP33/OiXC+WvK9AxUebnf5nbw==}
    engines: {node: '>= 0.6.3'}
    dependencies:
      readable-stream: 2.3.8
    dev: true

  /loader-runner@4.2.0:
    resolution: {integrity: sha512-92+huvxMvYlMzMt0iIOukcwYBFpkYJdpl2xsZ7LrlayO7E8SOv+JJUEK17B/dJIHAOLMfh2dZZ/Y18WgmGtYNw==}
    engines: {node: '>=6.11.5'}
    dev: true

  /locate-path@5.0.0:
    resolution: {integrity: sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==}
    engines: {node: '>=8'}
    dependencies:
      p-locate: 4.1.0
    dev: true

  /lodash@4.17.21:
    resolution: {integrity: sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==}
    dev: true

  /lru-cache@6.0.0:
    resolution: {integrity: sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==}
    engines: {node: '>=10'}
    dependencies:
      yallist: 4.0.0
    dev: true

  /merge-stream@2.0.0:
    resolution: {integrity: sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==}
    dev: true

  /merge2@1.4.1:
    resolution: {integrity: sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==}
    engines: {node: '>= 8'}
    dev: true

  /micromatch@4.0.5:
    resolution: {integrity: sha512-DMy+ERcEW2q8Z2Po+WNXuw3c5YaUSFjAO5GsJqfEl7UjvtIuFKO6ZrKvcItdy98dwFI2N1tg3zNIdKaQT+aNdA==}
    engines: {node: '>=8.6'}
    dependencies:
      braces: 3.0.2
      picomatch: 2.3.1
    dev: true

  /mime-db@1.49.0:
    resolution: {integrity: sha512-CIc8j9URtOVApSFCQIF+VBkX1RwXp/oMMOrqdyXSBXq5RWNEsRfyj1kiRnQgmNXmHxPoFIxOroKA3zcU9P+nAA==}
    engines: {node: '>= 0.6'}
    dev: true

  /mime-types@2.1.32:
    resolution: {integrity: sha512-hJGaVS4G4c9TSMYh2n6SQAGrC4RnfU+daP8G7cSCmaqNjiOoUY0VHCMS42pxnQmVF1GWwFhbHWn3RIxCqTmZ9A==}
    engines: {node: '>= 0.6'}
    dependencies:
      mime-db: 1.49.0
    dev: true

  /mimic-fn@2.1.0:
    resolution: {integrity: sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==}
    engines: {node: '>=6'}
    dev: true

  /minimatch@5.1.6:
    resolution: {integrity: sha512-lKwV/1brpG6mBUFHtb7NUmtABCb2WZZmm2wNiOA5hAb8VdCS4B3dtMWyvcoViccwAW/COERjXLt0zP1zXUN26g==}
    engines: {node: '>=10'}
    dependencies:
      brace-expansion: 2.0.1
    dev: true

  /neo-async@2.6.2:
    resolution: {integrity: sha512-Yd3UES5mWCSqR+qNT93S3UoYUkqAZ9lLg8a7g9rimsWmYGK8cVToA4/sF3RrshdyV3sAGMXVUmpMYOw+dLpOuw==}
    dev: true

  /node-releases@1.1.73:
    resolution: {integrity: sha512-uW7fodD6pyW2FZNZnp/Z3hvWKeEW1Y8R1+1CnErE8cXFXzl5blBOoVB41CvMer6P6Q0S5FXDwcHgFd1Wj0U9zg==}
    dev: true

  /normalize-path@3.0.0:
    resolution: {integrity: sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==}
    engines: {node: '>=0.10.0'}
    dev: true

  /npm-run-path@4.0.1:
    resolution: {integrity: sha512-S48WzZW777zhNIrn7gxOlISNAqi9ZC/uQFnRdbeIHhZhCA6UqpkOT8T1G7BvfdgP4Er8gF4sUbaS0i7QvIfCWw==}
    engines: {node: '>=8'}
    dependencies:
      path-key: 3.1.1
    dev: true

  /once@1.4.0:
    resolution: {integrity: sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==}
    dependencies:
      wrappy: 1.0.2
    dev: true

  /onetime@5.1.2:
    resolution: {integrity: sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==}
    engines: {node: '>=6'}
    dependencies:
      mimic-fn: 2.1.0
    dev: true

  /p-limit@2.3.0:
    resolution: {integrity: sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==}
    engines: {node: '>=6'}
    dependencies:
      p-try: 2.2.0
    dev: true

  /p-limit@3.1.0:
    resolution: {integrity: sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==}
    engines: {node: '>=10'}
    dependencies:
      yocto-queue: 0.1.0
    dev: true

  /p-locate@4.1.0:
    resolution: {integrity: sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==}
    engines: {node: '>=8'}
    dependencies:
      p-limit: 2.3.0
    dev: true

  /p-try@2.2.0:
    resolution: {integrity: sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==}
    engines: {node: '>=6'}
    dev: true

  /path-exists@4.0.0:
    resolution: {integrity: sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==}
    engines: {node: '>=8'}
    dev: true

  /path-key@3.1.1:
    resolution: {integrity: sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==}
    engines: {node: '>=8'}
    dev: true

  /path-parse@1.0.7:
    resolution: {integrity: sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==}
    dev: true

  /path-type@4.0.0:
    resolution: {integrity: sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==}
    engines: {node: '>=8'}
    dev: true

  /picomatch@2.3.1:
    resolution: {integrity: sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==}
    engines: {node: '>=8.6'}
    dev: true

  /pkg-dir@4.2.0:
    resolution: {integrity: sha512-HRDzbaKjC+AOWVXxAU/x54COGeIv9eb+6CkDSQoNTt4XyWoIJvuPsXizxu/Fr23EiekbtZwmh1IcIG/l/a10GQ==}
    engines: {node: '>=8'}
    dependencies:
      find-up: 4.1.0
    dev: true

  /process-nextick-args@2.0.1:
    resolution: {integrity: sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==}
    dev: true

  /punycode@2.1.1:
    resolution: {integrity: sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A==}
    engines: {node: '>=6'}
    dev: true

  /queue-microtask@1.2.3:
    resolution: {integrity: sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==}
    dev: true

  /queue-tick@1.0.1:
    resolution: {integrity: sha512-kJt5qhMxoszgU/62PLP1CJytzd2NKetjSRnyuj31fDd3Rlcz3fzlFdFLD1SItunPwyqEOkca6GbV612BWfaBag==}
    dev: true

  /randombytes@2.1.0:
    resolution: {integrity: sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==}
    dependencies:
      safe-buffer: 5.2.1
    dev: true

  /readable-stream@2.3.8:
    resolution: {integrity: sha512-8p0AUk4XODgIewSi0l8Epjs+EVnWiK7NoDIEGU0HhE7+ZyY8D1IMY7odu5lRrFXGg71L15KG8QrPmum45RTtdA==}
    dependencies:
      core-util-is: 1.0.3
      inherits: 2.0.4
      isarray: 1.0.0
      process-nextick-args: 2.0.1
      safe-buffer: 5.1.2
      string_decoder: 1.1.1
      util-deprecate: 1.0.2
    dev: true

  /readable-stream@3.6.2:
    resolution: {integrity: sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==}
    engines: {node: '>= 6'}
    dependencies:
      inherits: 2.0.4
      string_decoder: 1.3.0
      util-deprecate: 1.0.2
    dev: true

  /readdir-glob@1.1.3:
    resolution: {integrity: sha512-v05I2k7xN8zXvPD9N+z/uhXPaj0sUFCe2rcWZIpBsqxfP7xXFQ0tipAd/wjj1YxWyWtUS5IDJpOG82JKt2EAVA==}
    dependencies:
      minimatch: 5.1.6
    dev: true

  /rechoir@0.7.1:
    resolution: {integrity: sha512-/njmZ8s1wVeR6pjTZ+0nCnv8SpZNRMT2D1RLOJQESlYFDBvwpTA4KWJpZ+sBJ4+vhjILRcK7JIFdGCdxEAAitg==}
    engines: {node: '>= 0.10'}
    dependencies:
      resolve: 1.20.0
    dev: true

  /resolve-cwd@3.0.0:
    resolution: {integrity: sha512-OrZaX2Mb+rJCpH/6CpSqt9xFVpN++x01XnN2ie9g6P5/3xelLAkXWVADpdz1IHD/KFfEXyE6V0U01OQ3UO2rEg==}
    engines: {node: '>=8'}
    dependencies:
      resolve-from: 5.0.0
    dev: true

  /resolve-from@5.0.0:
    resolution: {integrity: sha512-qYg9KP24dD5qka9J47d0aVky0N+b4fTU89LN9iDnjB5waksiC49rvMB0PrUJQGoTmH50XPiqOvAjDfaijGxYZw==}
    engines: {node: '>=8'}
    dev: true

  /resolve@1.20.0:
    resolution: {integrity: sha512-wENBPt4ySzg4ybFQW2TT1zMQucPK95HSh/nq2CFTZVOGut2+pQvSsgtda4d26YrYcr067wjbmzOG8byDPBX63A==}
    dependencies:
      is-core-module: 2.5.0
      path-parse: 1.0.7
    dev: true

  /reusify@1.0.4:
    resolution: {integrity: sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==}
    engines: {iojs: '>=1.0.0', node: '>=0.10.0'}
    dev: true

  /run-parallel@1.2.0:
    resolution: {integrity: sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==}
    dependencies:
      queue-microtask: 1.2.3
    dev: true

  /safe-buffer@5.1.2:
    resolution: {integrity: sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==}
    dev: true

  /safe-buffer@5.2.1:
    resolution: {integrity: sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==}
    dev: true

  /schema-utils@3.1.1:
    resolution: {integrity: sha512-Y5PQxS4ITlC+EahLuXaY86TXfR7Dc5lw294alXOq86JAHCihAIZfqv8nNCWvaEJvaC51uN9hbLGeV0cFBdH+Fw==}
    engines: {node: '>= 10.13.0'}
    dependencies:
      '@types/json-schema': 7.0.9
      ajv: 6.12.6
      ajv-keywords: 3.5.2(ajv@6.12.6)
    dev: true

  /semver@7.5.4:
    resolution: {integrity: sha512-1bCSESV6Pv+i21Hvpxp3Dx+pSD8lIPt8uVjRrxAUt/nbswYc+tK6Y2btiULjd4+fnq15PX+nqQDC7Oft7WkwcA==}
    engines: {node: '>=10'}
    hasBin: true
    dependencies:
      lru-cache: 6.0.0
    dev: true

  /serialize-javascript@6.0.0:
    resolution: {integrity: sha512-Qr3TosvguFt8ePWqsvRfrKyQXIiW+nGbYpy8XK24NQHE83caxWt+mIymTT19DGFbNWNLfEwsrkSmN64lVWB9ag==}
    dependencies:
      randombytes: 2.1.0
    dev: true

  /shallow-clone@3.0.1:
    resolution: {integrity: sha512-/6KqX+GVUdqPuPPd2LxDDxzX6CAbjJehAAOKlNpqqUpAqPM6HeL8f+o3a+JsyGjn2lv0WY8UsTgUJjU9Ok55NA==}
    engines: {node: '>=8'}
    dependencies:
      kind-of: 6.0.3
    dev: true

  /shebang-command@2.0.0:
    resolution: {integrity: sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==}
    engines: {node: '>=8'}
    dependencies:
      shebang-regex: 3.0.0
    dev: true

  /shebang-regex@3.0.0:
    resolution: {integrity: sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==}
    engines: {node: '>=8'}
    dev: true

  /signal-exit@3.0.3:
    resolution: {integrity: sha512-VUJ49FC8U1OxwZLxIbTTrDvLnf/6TDgxZcK8wxR8zs13xpx7xbG60ndBlhNrFi2EMuFRoeDoJO7wthSLq42EjA==}
    dev: true

  /slash@3.0.0:
    resolution: {integrity: sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q==}
    engines: {node: '>=8'}
    dev: true

  /source-map-support@0.5.21:
    resolution: {integrity: sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==}
    dependencies:
      buffer-from: 1.1.2
      source-map: 0.6.1
    dev: true

  /source-map@0.6.1:
    resolution: {integrity: sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==}
    engines: {node: '>=0.10.0'}
    dev: true

  /source-map@0.7.4:
    resolution: {integrity: sha512-l3BikUxvPOcn5E74dZiq5BGsTb5yEwhaTSzccU6t4sDOH8NWJCstKO5QT2CvtFoK6F0saL7p9xHAqHOlCPJygA==}
    engines: {node: '>= 8'}
    dev: true

  /streamx@2.15.1:
    resolution: {integrity: sha512-fQMzy2O/Q47rgwErk/eGeLu/roaFWV0jVsogDmrszM9uIw8L5OA+t+V93MgYlufNptfjmYR1tOMWhei/Eh7TQA==}
    dependencies:
      fast-fifo: 1.3.2
      queue-tick: 1.0.1
    dev: true

  /string_decoder@1.1.1:
    resolution: {integrity: sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==}
    dependencies:
      safe-buffer: 5.1.2
    dev: true

  /string_decoder@1.3.0:
    resolution: {integrity: sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==}
    dependencies:
      safe-buffer: 5.2.1
    dev: true

  /strip-final-newline@2.0.0:
    resolution: {integrity: sha512-BrpvfNAE3dcvq7ll3xVumzjKjZQ5tI1sEUIKr3Uoks0XUl45St3FlatVqef9prk4jRDzhW6WZg+3bk93y6pLjA==}
    engines: {node: '>=6'}
    dev: true

  /supports-color@7.2.0:
    resolution: {integrity: sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==}
    engines: {node: '>=8'}
    dependencies:
      has-flag: 4.0.0
    dev: true

  /supports-color@8.1.1:
    resolution: {integrity: sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==}
    engines: {node: '>=10'}
    dependencies:
      has-flag: 4.0.0
    dev: true

  /tapable@2.2.1:
    resolution: {integrity: sha512-GNzQvQTOIP6RyTfE2Qxb8ZVlNmw0n88vp1szwWRimP02mnTsx3Wtn5qRdqY9w2XduFNUgvOwhNnQsjwCp+kqaQ==}
    engines: {node: '>=6'}
    dev: true

  /tar-stream@3.1.6:
    resolution: {integrity: sha512-B/UyjYwPpMBv+PaFSWAmtYjwdrlEaZQEhMIBFNC5oEG8lpiW8XjcSdmEaClj28ArfKScKHs2nshz3k2le6crsg==}
    dependencies:
      b4a: 1.6.4
      fast-fifo: 1.3.2
      streamx: 2.15.1
    dev: true

  /terser-webpack-plugin@5.1.4(webpack@5.76.0):
    resolution: {integrity: sha512-C2WkFwstHDhVEmsmlCxrXUtVklS+Ir1A7twrYzrDrQQOIMOaVAYykaoo/Aq1K0QRkMoY2hhvDQY1cm4jnIMFwA==}
    engines: {node: '>= 10.13.0'}
    peerDependencies:
      webpack: ^5.1.0
    dependencies:
      jest-worker: 27.0.6
      p-limit: 3.1.0
      schema-utils: 3.1.1
      serialize-javascript: 6.0.0
      source-map: 0.6.1
      terser: 5.14.2
      webpack: 5.76.0(webpack-cli@4.8.0)
    dev: true

  /terser@5.14.2:
    resolution: {integrity: sha512-oL0rGeM/WFQCUd0y2QrWxYnq7tfSuKBiqTjRPWrRgB46WD/kiwHwF8T23z78H6Q6kGCuuHcPB+KULHRdxvVGQA==}
    engines: {node: '>=10'}
    hasBin: true
    dependencies:
      '@jridgewell/source-map': 0.3.2
      acorn: 8.8.0
      commander: 2.20.3
      source-map-support: 0.5.21
    dev: true

  /to-regex-range@5.0.1:
    resolution: {integrity: sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==}
    engines: {node: '>=8.0'}
    dependencies:
      is-number: 7.0.0
    dev: true

  /ts-loader@9.5.0(typescript@5.2.2)(webpack@5.76.0):
    resolution: {integrity: sha512-LLlB/pkB4q9mW2yLdFMnK3dEHbrBjeZTYguaaIfusyojBgAGf5kF+O6KcWqiGzWqHk0LBsoolrp4VftEURhybg==}
    engines: {node: '>=12.0.0'}
    peerDependencies:
      typescript: '*'
      webpack: ^5.0.0
    dependencies:
      chalk: 4.1.2
      enhanced-resolve: 5.15.0
      micromatch: 4.0.5
      semver: 7.5.4
      source-map: 0.7.4
      typescript: 5.2.2
      webpack: 5.76.0(webpack-cli@4.8.0)
    dev: true

  /typescript@5.2.2:
    resolution: {integrity: sha512-mI4WrpHsbCIcwT9cF4FZvr80QUeKvsUsUvKDoR+X/7XHQH98xYD8YHZg7ANtz2GtZt/CBq2QJ0thkGJMHfqc1w==}
    engines: {node: '>=14.17'}
    hasBin: true
    dev: true

  /uri-js@4.4.1:
    resolution: {integrity: sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==}
    dependencies:
      punycode: 2.1.1
    dev: true

  /util-deprecate@1.0.2:
    resolution: {integrity: sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==}
    dev: true

  /v8-compile-cache@2.3.0:
    resolution: {integrity: sha512-l8lCEmLcLYZh4nbunNZvQCJc5pv7+RCwa8q/LdUx8u7lsWvPDKmpodJAJNwkAhJC//dFY48KuIEmjtd4RViDrA==}
    dev: true

  /watchpack@2.4.0:
    resolution: {integrity: sha512-Lcvm7MGST/4fup+ifyKi2hjyIAwcdI4HRgtvTpIUxBRhB+RFtUh8XtDOxUfctVCnhVi+QQj49i91OyvzkJl6cg==}
    engines: {node: '>=10.13.0'}
    dependencies:
      glob-to-regexp: 0.4.1
      graceful-fs: 4.2.11
    dev: true

  /webpack-cli@4.8.0(webpack@5.76.0):
    resolution: {integrity: sha512-+iBSWsX16uVna5aAYN6/wjhJy1q/GKk4KjKvfg90/6hykCTSgozbfz5iRgDTSJt/LgSbYxdBX3KBHeobIs+ZEw==}
    engines: {node: '>=10.13.0'}
    hasBin: true
    peerDependencies:
      '@webpack-cli/generators': '*'
      '@webpack-cli/migrate': '*'
      webpack: 4.x.x || 5.x.x
      webpack-bundle-analyzer: '*'
      webpack-dev-server: '*'
    peerDependenciesMeta:
      '@webpack-cli/generators':
        optional: true
      '@webpack-cli/migrate':
        optional: true
      webpack-bundle-analyzer:
        optional: true
      webpack-dev-server:
        optional: true
    dependencies:
      '@discoveryjs/json-ext': 0.5.3
      '@webpack-cli/configtest': 1.0.4(webpack-cli@4.8.0)(webpack@5.76.0)
      '@webpack-cli/info': 1.3.0(webpack-cli@4.8.0)
      '@webpack-cli/serve': 1.5.2(webpack-cli@4.8.0)
      colorette: 1.2.2
      commander: 7.2.0
      execa: 5.1.1
      fastest-levenshtein: 1.0.12
      import-local: 3.0.2
      interpret: 2.2.0
      rechoir: 0.7.1
      v8-compile-cache: 2.3.0
      webpack: 5.76.0(webpack-cli@4.8.0)
      webpack-merge: 5.8.0
    dev: true

  /webpack-merge@5.8.0:
    resolution: {integrity: sha512-/SaI7xY0831XwP6kzuwhKWVKDP9t1QY1h65lAFLbZqMPIuYcD9QAW4u9STIbU9kaJbPBB/geU/gLr1wDjOhQ+Q==}
    engines: {node: '>=10.0.0'}
    dependencies:
      clone-deep: 4.0.1
      wildcard: 2.0.0
    dev: true

  /webpack-sources@3.2.3:
    resolution: {integrity: sha512-/DyMEOrDgLKKIG0fmvtz+4dUX/3Ghozwgm6iPp8KRhvn+eQf9+Q7GWxVNMk3+uCPWfdXYC4ExGBckIXdFEfH1w==}
    engines: {node: '>=10.13.0'}
    dev: true

  /webpack@5.76.0(webpack-cli@4.8.0):
    resolution: {integrity: sha512-l5sOdYBDunyf72HW8dF23rFtWq/7Zgvt/9ftMof71E/yUb1YLOBmTgA2K4vQthB3kotMrSj609txVE0dnr2fjA==}
    engines: {node: '>=10.13.0'}
    hasBin: true
    peerDependencies:
      webpack-cli: '*'
    peerDependenciesMeta:
      webpack-cli:
        optional: true
    dependencies:
      '@types/eslint-scope': 3.7.4
      '@types/estree': 0.0.51
      '@webassemblyjs/ast': 1.11.1
      '@webassemblyjs/wasm-edit': 1.11.1
      '@webassemblyjs/wasm-parser': 1.11.1
      acorn: 8.8.0
      acorn-import-assertions: 1.7.6(acorn@8.8.0)
      browserslist: 4.16.7
      chrome-trace-event: 1.0.3
      enhanced-resolve: 5.15.0
      es-module-lexer: 0.9.3
      eslint-scope: 5.1.1
      events: 3.3.0
      glob-to-regexp: 0.4.1
      graceful-fs: 4.2.11
      json-parse-even-better-errors: 2.3.1
      loader-runner: 4.2.0
      mime-types: 2.1.32
      neo-async: 2.6.2
      schema-utils: 3.1.1
      tapable: 2.2.1
      terser-webpack-plugin: 5.1.4(webpack@5.76.0)
      watchpack: 2.4.0
      webpack-cli: 4.8.0(webpack@5.76.0)
      webpack-sources: 3.2.3
    dev: true

  /which@2.0.2:
    resolution: {integrity: sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==}
    engines: {node: '>= 8'}
    hasBin: true
    dependencies:
      isexe: 2.0.0
    dev: true

  /wildcard@2.0.0:
    resolution: {integrity: sha512-JcKqAHLPxcdb9KM49dufGXn2x3ssnfjbcaQdLlfZsL9rH9wgDQjUtDxbo8NE0F6SFvydeu1VhZe7hZuHsB2/pw==}
    dev: true

  /wrappy@1.0.2:
    resolution: {integrity: sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==}
    dev: true

  /yallist@4.0.0:
    resolution: {integrity: sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==}
    dev: true

  /yocto-queue@0.1.0:
    resolution: {integrity: sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==}
    engines: {node: '>=10'}
    dev: true

  /zip-stream@5.0.1:
    resolution: {integrity: sha512-UfZ0oa0C8LI58wJ+moL46BDIMgCQbnsb+2PoiJYtonhBsMh2bq1eRBVkvjfVsqbEHd9/EgKPUuL9saSSsec8OA==}
    engines: {node: '>= 12.0.0'}
    dependencies:
      archiver-utils: 4.0.1
      compress-commons: 5.0.1
      readable-stream: 3.6.2
    dev: true
`;
