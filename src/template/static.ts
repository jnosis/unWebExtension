import type { CreateOptions } from '../types.ts';

export const staticTemplate = (name: string, options: CreateOptions) => {
  return [
    generateLocale(name, options),
    LOCALE_SCRIPT,
    CHANGELOG.replaceAll('{name}', name),
  ];
};

function generateLocale(name: string, options: CreateOptions) {
  return `{
  "extensionName": {
    "message": "${name}"
  },
  "extensionDescription": {
    "message": ""
  },${
    options.apis.includes('commands')
      ? `\n\n  "commands_": {\n    "message": ""\n  },`
      : ''
  }

  "notificationTitle": {
    "message": "Updated"
  },

  "contextMenu_shortcuts": {
    "message": "Shortcut Setting"
  },
  "contextMenu_changelog": {
    "message": "changelog"
  },${
    options.createOptions
      ? `\n\n  "option_": {\n    "message": ""\n  },\n  "option_reset": {\n    "message": "RESET"\n  },`
      : ''
  }${options.createPopup ? `\n\n  "popup_": {\n    "message": ""\n  },` : ''}

  "feature1": {
    "message": ""
  },

  "changelog_1_0_0": {
    "message": "1.0.0: Initial release"
  },

  "knownIssue1": {
    "message": ""
  },

  "todo1": {
    "message": ""
  }
}
`;
}

const LOCALE_SCRIPT = `import * as browser from './api/api';

export default function localizeHtmlPage() {
  const elements = document.querySelectorAll('.locale-text');
  const msgRegex = /__MSG_(\\w+)__/g;
  for (const element of elements) {
    const text = element.textContent;
    if (typeof text === 'string') {
      const localizedText = text.replace(msgRegex, (_match, key: string) => {
        return key ? browser.i18n.getMessage(key) : text;
      });

      if (localizedText !== text) {
        element.textContent = localizedText;
      }
    }
  }
}
`;

const CHANGELOG = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>{name} ChangeLog</title>
    <!-- <link rel="stylesheet" href="../css/changelog.css" /> -->
    <script defer src="changelog.js"></script>
  </head>
  <body>
    <header>
      <h1>&nbsp;{name}</h1>
    </header>
    <section>
      <article>
        <header>
          <hr />
          <h2>&nbsp;&nbsp;Feature</h2>
        </header>

        <section>
          <ul>
            <li class="locale-text">__MSG_feature1__</li>
          </ul>
        </section>
      </article>

      <article>
        <header>
          <hr />
          <h2>&nbsp;&nbsp;ChangeLog</h2>
        </header>

        <section>
          <ul>
            
            <li class="locale-text">__MSG_changelog_1_0_0__</li>
          </ul>
        </section>
      </article>

      <article>
        <header>
          <hr />
          <h2>&nbsp;&nbsp;Known Issues</h2>
        </header>

        <section>
          <ul>
            <li class="locale-text">__MSG_knownIssue1__</li>
          </ul>
        </section>
      </article>

      <article>
        <header>
          <hr />
          <h2>&nbsp;&nbsp;ToDo</h2>
        </header>

        <section>
          <ul>
            <li class="locale-text">__MSG_todo1__</li>
          </ul>
        </section>
      </article>
    </section>
    <footer>
      <hr />
      <label id="version"></label>
    </footer>
  </body>
</html>
`;
