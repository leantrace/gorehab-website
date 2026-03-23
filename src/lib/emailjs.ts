export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RATE_LIMIT_MS = 30_000
const lastSubmitMap = new Map<string, number>()

export function isHoneypotFilled(form: HTMLFormElement): boolean {
  const hp = form.querySelector<HTMLInputElement>('input[name="website_url"]')
  return !!hp?.value
}

export function isRateLimited(formId: string): boolean {
  const last = lastSubmitMap.get(formId)
  return !!last && Date.now() - last < RATE_LIMIT_MS
}

export function markSubmitted(formId: string) {
  lastSubmitMap.set(formId, Date.now())
}

let emailjsReady: ReturnType<typeof import('@emailjs/browser')> | null = null

function loadEmailJS() {
  if (!emailjsReady) {
    emailjsReady = import('@emailjs/browser').then((mod) => {
      mod.default.init({
        publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
        blockHeadless: true,
      })
      return mod
    })
  }
  return emailjsReady
}

export function handleNewsletterSubmit(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement | null
  if (!form) return

  const successMsg = form.dataset.success || 'Subscribed!'
  const errorEmailMsg = form.dataset.errorEmail || 'Please enter a valid email.'
  const errorGenericMsg = form.dataset.errorGeneric || 'Something went wrong'

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (isHoneypotFilled(form) || isRateLimited(formId)) return

    const input = form.querySelector('input[name="email_from"]') as HTMLInputElement
    const btn = form.querySelector('button') as HTMLButtonElement
    const email = input?.value?.trim()

    if (!email || !EMAIL_REGEX.test(email)) {
      window.showToast(errorEmailMsg, 'error')
      return
    }

    const originalText = btn.textContent
    btn.disabled = true
    btn.textContent = '...'

    try {
      const { default: emailjs } = await loadEmailJS()
      await emailjs.send(import.meta.env.PUBLIC_EMAILJS_SERVICE_ID, import.meta.env.PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID, {
        email_from: email,
      })

      markSubmitted(formId)
      window.showToast(successMsg, 'success')
      input.value = ''
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : errorGenericMsg
      window.showToast(msg, 'error')
    } finally {
      btn.disabled = false
      btn.textContent = originalText
    }
  })
}

export async function sendContactForm(form: HTMLFormElement) {
  const { default: emailjs } = await loadEmailJS()
  return emailjs.sendForm(import.meta.env.PUBLIC_EMAILJS_SERVICE_ID, import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID, form)
}
