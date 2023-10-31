export const backgroundTemplate = () => {
  return [BACKGROUND_SCRIPT, INDEX_TS, generateListener(), LOAD_TS];
};

const BACKGROUND_SCRIPT = `import { Background } from './background/index';

(() => new Background())();
`;

const INDEX_TS = `import * as browser from '../api/api';
import { Listener } from './listener';
import { Load } from './load';

export class Background {
  constructor() {
    this.addListener();
    browser.runtime.onStartup.addListener(() => this.onStart());
    browser.runtime.onInstalled.addListener((details) =>
      this.onInstalled(details)
    );
  }

  private onStart() {
    console.log('onStart');
    new Load();
  }

  private onInstalled(details?: browser.runtime.InstalledDetails) {
    console.log('onInstalled');
    new Load(details);
  }

  private addListener() {
    new Listener();
  }
}
`;

const LISTENER_TS = ``;

function generateListener() {
  return LISTENER_TS;
}

const LOAD_TS = ``;
