export const optionsTemplate = (name: string) => {
  return [
    generateOptionsHtml(name),
    OPTIONS_SCRIPT,
    OPTION_STORAGE,
    CHANGE_OPTION,
  ];
};

function generateOptionsHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${name} Options</title>
    <!-- <link rel="stylesheet" href="../css/settings.css" /> -->
    <script defer src="options.js"></script>
  </head>
  <body>
    <section>
      <article>
        <header>
          <label class="locale-text setting-category" id="">
            __MSG_option___
          </label>
          <br />
        </header>

        <section>
          <input
            type=""
            id=""
            name=""
            value=""
          />
          <label
            class="locale-text"
            for=""
            id=""
          >
            __MSG_option___
          </label>
        </section>
      </article>
    </section>
    <footer>
      <button
        class="locale-text"
        id="reset"
        style="margin: 2px; width: 80px; height: 20px"
      >
        __MSG_option_reset__
      </button>
      <br />
      <button id="changelog" style="margin: 2px; width: 80px; height: 20px">
        changelog
      </button>
    </footer>
  </body>
</html>
`;
}

const OPTIONS_SCRIPT = `import * as browser from './api/api';
import localizeHtmlPage from './locale';
import { loadOption } from './option/storage';
import { OptionPageMessageId } from './types';

document.addEventListener('DOMContentLoaded', () => {
  localizeHtmlPage();
  loadOptionsPage();
});
document.addEventListener('click', saveOptionsPage);
browser.storage.onChanged.addListener(loadOptionsPage);

async function sendMessage(id: OptionPageMessageId, value: string | boolean) {
  console.trace(id, value);
  const response = await browser.runtime.sendMessage({ id, value });
  console.log(\`Response: \${response.response}\`);
  if (response.response === 'reset') location.reload();
}

function saveOptionsPage(event: MouseEvent) {
  const target = event.target as HTMLInputElement;
  const name = target.getAttribute('name');
  const id = target.id;
  console.log({ name, id });

  if (name === '') {
    const value = target.value;
    sendMessage('', value);
  } else if (id === 'reset') {
    sendMessage('reset', true);
    location.reload();
  } else if (id === 'changelog') {
    const url = browser.runtime.getURL('changelog.html');
    browser.tabs.create({ url });
  }
}

function loadOptionsPage() {
  loadOption(
    ({}) => {
      const somethingOption = document.querySelector(
        \`#\${}\`
      ) as HTMLInputElement;

      console.table({});

      somethingOption.checked = true;
    }
  );
}
`;

const OPTION_STORAGE = `import { Something } from '../types';
import * as browser from '../api/api';

export type Option = {
  something: Something;
};

type StorageKeys =
  | 'something'
  | 'wasInit';

export type StorageProperties = {
  something?: Something;
  wasInit?: boolean;
};

export const defaultOption: Option = {
  something: '',
};

export async function saveStorage(storage: StorageProperties) {
  console.trace(\`Save storage: \${storage}\`);
  console.table({ ...storage });
  await browser.storage.local.set({ ...storage });
}
export async function saveOption(
  storage: StorageProperties = defaultOption,
  callback?: () => void
) {
  browser.storage.sync.set({ ...storage }).then(callback);
}
export async function initStorage(callback?: () => void) {
  const initValues = await getPreviousValues();
  console.table({ ...initValues });
  saveOption(initValues, callback);
  saveStorage(initValues);
}
async function getPreviousValues(): Promise<StorageProperties> {
  const values: StorageProperties = { ...defaultOption, wasInit: true };
  const previousStorage = await browser.storage.sync.get();
  if (!previousStorage) {
    console.log(\`Not exist previous storage\`);
    return values;
  }
  if (!!previousStorage.wasInit) {
    return previousStorage;
  }

  return values;
}

export async function loadStorage(
  keys: StorageKeys | StorageKeys[] | null = null,
  callback: (items: StorageProperties) => void
) {
  console.trace(\`Load storage: \${keys}\`);
  const items = await browser.storage.local.get(keys);
  callback(items);
}
export async function loadOption(callback: (option: Option) => void) {
  loadStorage(
    [
      'something',
    ],
    (items) => {
      const option: Option = {
        something: items.something || defaultOption.something,
      };
      callback(option);
    }
  );
}

export * as ChangeOption from './changeOption';
`;

const CHANGE_OPTION = `import type { Something } from '../types';
import * as browser from '../api/api';
import { loadOption, saveOption } from './option';

export function setSomething(something: Something, callback?: () => void) {
  console.trace(\`Set something: \${something}\`);
  saveOption({ something }, callback);
  browser.storage.sync.set({ something });
}
export function reset() {
  console.trace(\`Reset option\`);
  saveOption();
}
`;
