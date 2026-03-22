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

export function handleNewsletterSubmit(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement | null
  if (!form) return

  const successMsg = form.dataset.success || 'Subscribed!'
  const errorEmailMsg = form.dataset.errorEmail || 'Please enter a valid email.'
  const errorGenericMsg = form.dataset.errorGeneric || 'Something went wrong'

  ensureInit()

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
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
      await emailjs.send(import.meta.env.PUBLIC_EMAILJS_SERVICE_ID, import.meta.env.PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID, {
        email_from: email,
      })

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
