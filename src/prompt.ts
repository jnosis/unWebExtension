import type { CheckboxOption } from './deps.ts';
import type { API, CreateOptions, Locale, Permission } from './types.ts';
import { Checkbox, Confirm, Input } from './deps.ts';

type PromptOptions = Partial<
  Omit<CreateOptions, 'apis' | 'permissions' | 'locales'>
>;

type AskOption = keyof Omit<PromptOptions, 'directory'>;

export async function promptCreation(
  options: PromptOptions,
  arg?: string,
): Promise<[string, CreateOptions]> {
  const name = arg || await Input.prompt('Enter extension name');

  const queues = OPTIONS.filter((option) => options[option] === undefined);

  const answers: PromptOptions = initOptions;
  for (const queue of queues) {
    answers[queue] = await askOption(queue);
  }

  const apis = (await Checkbox.prompt<API>({
    message: 'Select the APIs to use',
    search: true,
    options: API_LIST,
  })) as API[];

  const permissions = (await Checkbox.prompt<Permission>({
    message: 'Select the permissions to request',
    search: true,
    options: PERMISSION_LIST,
  })) as Permission[];

  const locales = (await Checkbox.prompt<Locale>({
    message: 'Select supported languages',
    search: true,
    options: LOCALE_LIST,
  })) as Locale[];

  return [name, {
    apis,
    permissions,
    locales,
    createBackground: !!answers.createBackground,
    createContentScripts: !!answers.createContentScripts,
    createOptions: !!answers.createOptions,
    createPopup: !!answers.createPopup,
    directory: options.directory ?? './',
  }];
}

async function askOption(option: AskOption) {
  if (option === 'createBackground') {
    return await Confirm.prompt('Create Background?');
  } else if (option === 'createContentScripts') {
    return await Confirm.prompt('Create Content Script?');
  } else if (option === 'createOptions') {
    return await Confirm.prompt('Create Option Page?');
  } else if (option === 'createPopup') {
    return await Confirm.prompt('Create Popup?');
  }
  return false;
}

const initOptions = {
  createBackground: false,
  createContentScripts: false,
  createOptions: false,
  createPopup: false,
  directory: './',
};

const OPTIONS: AskOption[] = [
  'createBackground',
  'createContentScripts',
  'createOptions',
  'createPopup',
];

const API_LIST: CheckboxOption<API>[] = [
  { value: 'accessibilityFeatures' },
  { value: 'action' },
  { value: 'alarms' },
  { value: 'bookmarks' },
  { value: 'browserAction' },
  { value: 'browsingData' },
  { value: 'commands' },
  { value: 'contentSettings' },
  { value: 'contextMenus' },
  { value: 'cookies' },
  { value: 'debugger' },
  { value: 'declarativeContent' },
  { value: 'declarativeNetRequest' },
  { value: 'desktopCapture' },
  { value: 'devtools' },
  { value: 'documentScan' },
  { value: 'downloads' },
  { value: 'enterprise' },
  { value: 'extension' },
  { value: 'fileBrowserHandler' },
  { value: 'fileSystemProvider' },
  { value: 'fontSettings' },
  { value: 'gcm' },
  { value: 'history' },
  { value: 'i18n' },
  { value: 'identity' },
  { value: 'idle' },
  { value: 'input' },
  { value: 'loginState' },
  { value: 'management' },
  { value: 'notifications' },
  { value: 'offscreen' },
  { value: 'omnibox' },
  { value: 'pageAction' },
  { value: 'pageCapture' },
  { value: 'permissions' },
  { value: 'platformKeys' },
  { value: 'power' },
  { value: 'printerProvider' },
  { value: 'printing' },
  { value: 'printingMetrics' },
  { value: 'privacy' },
  { value: 'proxy' },
  { value: 'runtime' },
  { value: 'scripting' },
  { value: 'search' },
  { value: 'sessions' },
  { value: 'sidePanel' },
  { value: 'storage' },
  { value: 'system' },
  { value: 'tabCapture' },
  { value: 'tabGroups' },
  { value: 'tabs' },
  { value: 'topSites' },
  { value: 'tts' },
  { value: 'ttsEngine' },
  { value: 'vpnProvider' },
  { value: 'wallpaper' },
  { value: 'webNavigation' },
  { value: 'webRequest' },
  { value: 'windows' },
];

const PERMISSION_LIST: CheckboxOption<Permission>[] = [
  { value: 'activeTab' },
  { value: 'alarms' },
  { value: 'background' },
  { value: 'bookmarks' },
  { value: 'browsingData' },
  { value: 'certificateProvider' },
  { value: 'clipboardRead' },
  { value: 'clipboardWrite' },
  { value: 'contentSettings' },
  { value: 'contextMenus' },
  { value: 'cookies' },
  { value: 'debugger' },
  { value: 'declarativeContent' },
  { value: 'declarativeNetRequest' },
  { value: 'declarativeNetRequestWithHostAccess' },
  { value: 'declarativeNetRequestFeedback' },
  { value: 'desktopCapture' },
  { value: 'documentScan' },
  { value: 'downloads' },
  { value: 'downloads.open' },
  { value: 'downloads.ui' },
  { value: 'enterprise.deviceAttributes' },
  { value: 'enterprise.hardwarePlatform' },
  { value: 'enterprise.networkingAttributes' },
  { value: 'enterprise.platformKeys' },
  { value: 'experimental' },
  { value: 'fileBrowserHandler' },
  { value: 'fileSystemProvider' },
  { value: 'fontSettings' },
  { value: 'gcm' },
  { value: 'geolocation' },
  { value: 'history' },
  { value: 'identity' },
  { value: 'idle' },
  { value: 'loginState' },
  { value: 'management' },
  { value: 'nativeMessaging' },
  { value: 'notifications' },
  { value: 'offscreen' },
  { value: 'pageCapture' },
  { value: 'platformKeys' },
  { value: 'power' },
  { value: 'printerProvider' },
  { value: 'printing' },
  { value: 'printingMetrics' },
  { value: 'privacy' },
  { value: 'processes' },
  { value: 'proxy' },
  { value: 'scripting' },
  { value: 'search' },
  { value: 'sessions' },
  { value: 'sidePanel' },
  { value: 'storage' },
  { value: 'system.cpu' },
  { value: 'system.display' },
  { value: 'system.memory' },
  { value: 'system.storage' },
  { value: 'tabCapture' },
  { value: 'tabGroups' },
  { value: 'tabs' },
  { value: 'topSites' },
  { value: 'tts' },
  { value: 'ttsEngine' },
  { value: 'unlimitedStorage' },
  { value: 'vpnProvider' },
  { value: 'wallpaper' },
  { value: 'webAuthenticationProxy' },
  { value: 'webNavigation' },
  { value: 'webRequest' },
  { value: 'webRequestBlocking' },
];

const LOCALE_LIST: CheckboxOption<Locale>[] = [
  { name: 'Arabic', value: 'ar' },
  { name: 'Amharic', value: 'am' },
  { name: 'Bulgarian', value: 'bg' },
  { name: 'Bengali', value: 'bn' },
  { name: 'Catalan', value: 'ca' },
  { name: 'Czech', value: 'cs' },
  { name: 'Danish', value: 'da' },
  { name: 'German', value: 'de' },
  { name: 'Greek', value: 'el' },
  { name: 'English', value: 'en' },
  { name: 'English (Australia)', value: 'en_AU' },
  { name: 'English (Great Britain)', value: 'en_GB' },
  { name: 'English (USA)', value: 'en_US' },
  { name: 'Spanish', value: 'es' },
  { name: 'Spanish (Latin America and Caribbean)', value: 'es_419' },
  { name: 'Estonian', value: 'et' },
  { name: 'Persian', value: 'fa' },
  { name: 'Finnish', value: 'fi' },
  { name: 'Filipino', value: 'fil' },
  { name: 'French', value: 'fr' },
  { name: 'Gujarati', value: 'gu' },
  { name: 'Hebrew', value: 'he' },
  { name: 'Hindi', value: 'hi' },
  { name: 'Croatian', value: 'hr' },
  { name: 'Hungarian', value: 'hu' },
  { name: 'Indonesian', value: 'id' },
  { name: 'Italian', value: 'it' },
  { name: 'Japanese', value: 'ja' },
  { name: 'Kannada', value: 'kn' },
  { name: 'Korean', value: 'ko' },
  { name: 'Lithuanian', value: 'lt' },
  { name: 'Latvian', value: 'lv' },
  { name: 'Malayalam', value: 'ml' },
  { name: 'Marathi', value: 'mr' },
  { name: 'Malay', value: 'ms' },
  { name: 'Dutch', value: 'nl' },
  { name: 'Norwegian', value: 'no' },
  { name: 'Polish', value: 'pl' },
  { name: 'Portuguese (Brazil)', value: 'pt_BR' },
  { name: 'Portuguese (Portugal)', value: 'pt_PT' },
  { name: 'Romanian', value: 'ro' },
  { name: 'Russian', value: 'ru' },
  { name: 'Slovak', value: 'sk' },
  { name: 'Slovenian', value: 'sl' },
  { name: 'Serbian', value: 'sr' },
  { name: 'Swedish', value: 'sv' },
  { name: 'Swahili', value: 'sw' },
  { name: 'Tamil', value: 'ta' },
  { name: 'Telugu', value: 'te' },
  { name: 'Thai', value: 'th' },
  { name: 'Turkish', value: 'tr' },
  { name: 'Ukrainian', value: 'uk' },
  { name: 'Vietnamese', value: 'vi' },
  { name: 'Chinese (China)', value: 'zh_CN' },
  { name: 'Chinese (Taiwan)', value: 'zh_TW' },
];
