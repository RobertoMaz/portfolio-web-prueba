<script setup lang="ts">
import { ref, reactive } from 'vue'
import { z } from 'zod'

// =====================================================
// VALIDATION SCHEMA
// =====================================================
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

// =====================================================
// STATIC CONTACT INFO
// =====================================================
interface ContactInfo {
  label: string
  value: string
  href: string
  ariaLabel: string
}

const contactLinks: ContactInfo[] = [
  {
    label: 'Email',
    value: 'contact@portfolio.dev',
    href: 'mailto:contact@portfolio.dev',
    ariaLabel: 'Send email to contact@portfolio.dev',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/portfolio-dev',
    href: 'https://linkedin.com/in/portfolio-dev',
    ariaLabel: 'Visit LinkedIn profile',
  },
  {
    label: 'GitHub',
    value: 'github.com/portfolio-dev',
    href: 'https://github.com/portfolio-dev',
    ariaLabel: 'Visit GitHub profile',
  },
  {
    label: 'Location',
    value: 'Buenos Aires, Argentina',
    href: '',
    ariaLabel: '',
  },
]

// =====================================================
// FORM STATE
// =====================================================
const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
})

interface FormErrors {
  name: string
  email: string
  message: string
}

const errors = reactive<FormErrors>({
  name: '',
  email: '',
  message: '',
})

const isLoading = ref(false)
const isSuccess = ref(false)

// =====================================================
// FORM LOGIC
// =====================================================
function clearErrors(): void {
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

function validateForm(): boolean {
  clearErrors()

  const result = contactSchema.safeParse({
    name: form.name,
    email: form.email,
    message: form.message,
  })

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormErrors
      if (field in errors) {
        errors[field] = issue.message
      }
    }
    return false
  }

  return true
}

async function handleSubmit(): Promise<void> {
  if (!validateForm()) return

  isLoading.value = true

  await new Promise<void>((resolve) => setTimeout(resolve, 1500))

  isLoading.value = false
  isSuccess.value = true

  form.name = ''
  form.email = ''
  form.message = ''
}

function handleReset(): void {
  isSuccess.value = false
  clearErrors()
}
</script>

<template>
  <main class="contact-page">
    <div class="contact-container">

      <!-- =============================================
           PAGE HEADER
           ============================================= -->
      <header class="contact-header">
        <p class="contact-header__label">Get in touch</p>
        <h1 class="contact-header__title">Let's talk</h1>
        <p class="contact-header__description">
          Have a project in mind or just want to say hello? Fill in the form
          below or reach out directly.
        </p>
      </header>

      <!-- =============================================
           MAIN CONTENT — two-column layout on desktop
           ============================================= -->
      <div class="contact-content">

        <!-- Contact Info -->
        <aside class="contact-info" aria-label="Contact information">
          <h2 class="contact-info__title">Contact details</h2>
          <ul class="contact-info__list">
            <li
              v-for="item in contactLinks"
              :key="item.label"
              class="contact-info__item"
            >
              <span class="contact-info__label">{{ item.label }}</span>
              <a
                v-if="item.href"
                :href="item.href"
                :aria-label="item.ariaLabel"
                class="contact-info__value contact-info__value--link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.value }}
              </a>
              <span
                v-else
                class="contact-info__value"
              >
                {{ item.value }}
              </span>
            </li>
          </ul>
        </aside>

        <!-- Contact Form -->
        <section class="contact-form-wrapper" aria-label="Contact form">

          <!-- Success state -->
          <div
            v-if="isSuccess"
            class="form-success"
            role="alert"
            aria-live="polite"
          >
            <div class="form-success__icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="success-icon"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 class="form-success__title">Message sent!</h3>
            <p class="form-success__text">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              type="button"
              class="form-success__btn"
              @click="handleReset"
            >
              Send another message
            </button>
          </div>

          <!-- Form -->
          <form
            v-else
            class="contact-form"
            novalidate
            @submit.prevent="handleSubmit"
          >

            <!-- Name field -->
            <div class="field">
              <label for="contact-name" class="field__label">
                Name
                <span class="field__required" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Your name"
                :class="['field__input', { 'field__input--error': errors.name }]"
                :aria-describedby="errors.name ? 'contact-name-error' : undefined"
                :aria-invalid="errors.name ? 'true' : 'false'"
              />
              <p
                v-if="errors.name"
                id="contact-name-error"
                class="field__error"
                role="alert"
              >
                {{ errors.name }}
              </p>
            </div>

            <!-- Email field -->
            <div class="field">
              <label for="contact-email" class="field__label">
                Email
                <span class="field__required" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="your@email.com"
                :class="['field__input', { 'field__input--error': errors.email }]"
                :aria-describedby="errors.email ? 'contact-email-error' : undefined"
                :aria-invalid="errors.email ? 'true' : 'false'"
              />
              <p
                v-if="errors.email"
                id="contact-email-error"
                class="field__error"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Message field -->
            <div class="field">
              <label for="contact-message" class="field__label">
                Message
                <span class="field__required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                placeholder="Tell me about your project or idea..."
                :class="['field__input', 'field__textarea', { 'field__input--error': errors.message }]"
                :aria-describedby="errors.message ? 'contact-message-error' : undefined"
                :aria-invalid="errors.message ? 'true' : 'false'"
              />
              <p
                v-if="errors.message"
                id="contact-message-error"
                class="field__error"
                role="alert"
              >
                {{ errors.message }}
              </p>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="form-submit"
              :disabled="isLoading"
              :aria-busy="isLoading ? 'true' : 'false'"
            >
              <span v-if="isLoading" class="form-submit__spinner" aria-hidden="true" />
              <span>{{ isLoading ? 'Sending...' : 'Send message' }}</span>
            </button>

          </form>
        </section>

      </div>
    </div>
  </main>
</template>

<style scoped>
/* =====================================================
   CONTACT PAGE — Mobile First
   ===================================================== */

.contact-page {
  min-height: 100vh;
  padding: var(--space-8) var(--space-4);
}

.contact-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

/* =====================================================
   PAGE HEADER
   ===================================================== */
.contact-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-header__label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.contact-header__label::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
}

.contact-header__title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .contact-header__title {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
  }
}

.contact-header__description {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 560px;
}

/* =====================================================
   CONTENT — two-column layout
   ===================================================== */
.contact-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

@media (min-width: 1024px) {
  .contact-content {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-16);
  }
}

/* =====================================================
   CONTACT INFO — aside
   ===================================================== */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

@media (min-width: 1024px) {
  .contact-info {
    width: 320px;
    flex-shrink: 0;
  }
}

.contact-info__title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.contact-info__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.contact-info__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.contact-info__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.contact-info__label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.contact-info__value {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text);
  word-break: break-word;
}

.contact-info__value--link {
  color: var(--color-primary);
  transition: color var(--transition-fast);
}

.contact-info__value--link:hover {
  color: var(--color-primary-hover);
}

/* =====================================================
   FORM WRAPPER
   ===================================================== */
.contact-form-wrapper {
  flex: 1;
}

/* =====================================================
   FORM
   ===================================================== */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

/* =====================================================
   FIELD
   ===================================================== */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field__label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
}

.field__required {
  color: var(--color-primary);
  margin-left: var(--space-1);
}

.field__input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-family: var(--font-sans);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  outline: none;
  min-height: 44px;
}

.field__input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.7;
}

.field__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
}

.field__input--error {
  border-color: #f87171;
}

.field__input--error:focus {
  border-color: #f87171;
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15);
}

.field__textarea {
  resize: vertical;
  min-height: 120px;
}

.field__error {
  font-size: var(--font-size-sm);
  color: #f87171;
  font-weight: 500;
}

/* =====================================================
   SUBMIT BUTTON
   ===================================================== */
.form-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 48px;
  padding: var(--space-3) var(--space-8);
  background-color: var(--color-primary);
  color: var(--color-bg);
  font-weight: 700;
  font-size: var(--font-size-base);
  font-family: var(--font-sans);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-base), transform var(--transition-fast), box-shadow var(--transition-base);
  box-shadow: var(--shadow-md);
  align-self: flex-start;
}

.form-submit:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.form-submit:active:not(:disabled) {
  transform: translateY(0);
}

.form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-submit__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(15, 23, 42, 0.3);
  border-top-color: var(--color-bg);
  border-radius: var(--radius-full);
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* =====================================================
   SUCCESS STATE
   ===================================================== */
.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-6);
  padding: var(--space-12) var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.form-success__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(
    135deg,
    rgba(6, 182, 212, 0.15) 0%,
    rgba(129, 140, 248, 0.15) 100%
  );
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: var(--radius-full);
  color: var(--color-primary);
}

.success-icon {
  width: 32px;
  height: 32px;
}

.form-success__title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-text);
}

.form-success__text {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  max-width: 380px;
  line-height: 1.7;
}

.form-success__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: var(--space-3) var(--space-6);
  background-color: transparent;
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--font-size-sm);
  font-family: var(--font-sans);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.form-success__btn:hover {
  background-color: var(--color-primary);
  color: var(--color-bg);
}
</style>
