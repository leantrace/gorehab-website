import de from '../i18n/de.json'
import en from '../i18n/en.json'

const dictionaries: Record<string, typeof en> = { en, de }

export function getDictionary(lang: string) {
  return dictionaries[lang] ?? dictionaries.en
}

export type Dictionary = typeof en
