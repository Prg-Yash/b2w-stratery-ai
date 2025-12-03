/**
 * Internationalization (i18n) Manager
 * Handles language switching and translation loading
 */

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem("b2w_language") || "en";
    this.translations = {};
    this.supportedLanguages = ["en", "es", "fr", "de"];
  }

  async init() {
    await this.loadTranslations(this.currentLanguage);
    this.updateUI();
  }

  async loadTranslations(lang) {
    if (this.translations[lang]) {
      return this.translations[lang];
    }

    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      this.translations[lang] = await response.json();
      console.log(`✅ Loaded ${lang} translations`);
      return this.translations[lang];
    } catch (error) {
      console.error(
        `❌ Failed to load translations for ${lang}:`,
        error.message
      );
      // Fallback to English
      if (lang !== "en") {
        console.log("Falling back to English translations...");
        return await this.loadTranslations("en");
      }
      // If English also fails, return empty object
      return {};
    }
  }

  async setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported`);
      return;
    }

    this.currentLanguage = lang;
    localStorage.setItem("b2w_language", lang);
    await this.loadTranslations(lang);
    this.updateUI();

    // Dispatch event for components to update
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language: lang } })
    );
  }

  t(key) {
    const keys = key.split(".");
    let value = this.translations[this.currentLanguage];

    // If no translations loaded, return the key
    if (!value) {
      console.warn(
        `No translations loaded for language: ${this.currentLanguage}`
      );
      return key;
    }

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Don't log warnings for every missing key during development
        // console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  }

  updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.t(key);

      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        if (element.placeholder !== undefined) {
          element.placeholder = translation;
        }
      } else {
        element.textContent = translation;
      }
    });

    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      element.placeholder = this.t(key);
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getSupportedLanguages() {
    return this.supportedLanguages.map((code) => ({
      code,
      name: this.getLanguageName(code),
    }));
  }

  getLanguageName(code) {
    const names = {
      en: "English",
      es: "Español",
      fr: "Français",
      de: "Deutsch",
    };
    return names[code] || code;
  }
}

// Export singleton instance
export const i18n = new I18n();
export default i18n;
