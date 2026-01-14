//-Path: "uno-tool/src/i18n/index.ts"
import i18n from 'i18next';
import en from './locales/en.json';
import th from './locales/th.json';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: { translation: en },
    th: { translation: th },
};

export const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
];

/**
 * Gets the stored language from localStorage or returns default
 */
function getStoredLanguage(): string {
    try {
        const stored = localStorage.getItem('setting');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.language) return parsed.language;
        }
    } catch {
        // ignore parsing errors
    }
    return 'th';
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'th',
    lng: getStoredLanguage(),
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
