import de from '../i18n/de.json'
import en from '../i18n/en.json'

const dictionaries: Record<string, typeof en> = { en, de }

export function getDictionary(lang: string) {
  return dictionaries[lang] ?? dictionaries.en
}

export type Dictionary = typeof en
export type HeroContent = Dictionary['hero']
export type BrandContent = Dictionary['brand']
export type HandTherapyContent = Dictionary['hand_therapy']
export type ComingSoonContent = Dictionary['coming_soon']
export type AboutContent = Dictionary['about']
export type ContactContent = Dictionary['contact']
export type FooterContent = Dictionary['footer']
