import emailjs from '@emailjs/browser'

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let initialized = false

export function ensureInit() {
  if (initialized) return
  emailjs.init({
    publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
  })
  initialized = true
}

export { emailjs }
