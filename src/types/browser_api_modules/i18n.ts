export type DetectedLanguage = {
  /** An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. For an unknown language, und will be returned, which means that [percentage] of the text is unknown to CLD. */
  language: LanguageCode;
  /** The percentage of the detected language */
  percentage: number;
};

/**
 * Since Chrome 47.
 * An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. For an unknown language, und will be returned, which means that [percentage] of the text is unknown to CLD.
 */
export type LanguageCode = string;

export type LanguageDetectionResult = {
  /** CLD detected language reliability */
  isReliable: boolean;
  /** Array of detectedLanguage */
  languages: DetectedLanguage[];
};

export type MessageOptions = {
  /** Escape < in translation to &lt;. This applies only to the message itself, not to the placeholders. Developers might want to use this if the translation is used in an HTML context. Closure Templates used with Closure Compiler generate this automatically. */
  escapeLt?: boolean;
};

export interface I18nModule {
  /**
   * Detects the language of the provided text using CLD.
   * @param text User input string to be translated.
   * @returns The 'detectLanguage' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  detectLanguage(text: string): Promise<LanguageDetectionResult>;
  /**
   * Since Chrome 47.
   * Detects the language of the provided text using CLD.
   * @param text User input string to be translated.
   * @param callback The callback parameter should be a function that looks like this:
   * (result: LanguageDetectionResult) => {...}
   */
  detectLanguage(
    text: string,
    callback: (result: LanguageDetectionResult) => void,
  ): void;

  /**
   * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use i18n.getUILanguage.
   * @returns The 'getAcceptLanguages' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getAcceptLanguages(): Promise<LanguageCode[]>;
  /**
   * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use i18n.getUILanguage.
   * @param callback The callback parameter should be a function that looks like this:
   * (languages: LanguageCode[]) => {...}
   */
  getAcceptLanguages(callback: (languages: LanguageCode[]) => void): void;

  /**
   * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the getMessage() call is wrong — for example, messageName is not a string or the substitutions array has more than 9 elements — this method returns undefined.
   * @param messageName The name of the message, as specified in the messages.json file.
   * @param substitutions Optional. Up to 9 substitution strings, if the message requires any.
   * @param options Optional. Since Chrome 75.
   * @returns Message localized for current locale.
   */
  getMessage(
    messageName: string,
    substitutions?: string | string[],
    options?: MessageOptions,
  ): string;

  /**
   * Gets the browser UI language of the browser. This is different from i18n.getAcceptLanguages which returns the preferred user languages.
   * @returns The browser UI language code such as en-US or fr-FR.
   */
  getUILanguage(): LanguageCode;
}
