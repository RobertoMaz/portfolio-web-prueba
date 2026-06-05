import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ContactView from '../components/ContactView.vue'

describe('ContactView', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // -------------------------------------------------------
  // 1. Renders the 3 fields and the submit button
  // -------------------------------------------------------
  it('renders all 3 form fields and the submit button', () => {
    const wrapper = mount(ContactView)

    expect(wrapper.find('#contact-name').exists()).toBe(true)
    expect(wrapper.find('#contact-email').exists()).toBe(true)
    expect(wrapper.find('#contact-message').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  // -------------------------------------------------------
  // 2. Shows errors when submitting empty form
  // -------------------------------------------------------
  it('shows inline errors for all fields when submitted empty', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('#contact-name-error').exists()).toBe(true)
    expect(wrapper.find('#contact-email-error').exists()).toBe(true)
    expect(wrapper.find('#contact-message-error').exists()).toBe(true)
  })

  // -------------------------------------------------------
  // 3. Validates email format
  // -------------------------------------------------------
  it('shows an error for invalid email format', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('#contact-name').setValue('John Doe')
    await wrapper.find('#contact-email').setValue('not-a-valid-email')
    await wrapper.find('#contact-message').setValue('This is a valid message with enough characters.')

    await wrapper.find('form').trigger('submit')

    const emailError = wrapper.find('#contact-email-error')
    expect(emailError.exists()).toBe(true)
    expect(emailError.text()).toContain('valid email')

    // Name and message errors should NOT appear
    expect(wrapper.find('#contact-name-error').exists()).toBe(false)
    expect(wrapper.find('#contact-message-error').exists()).toBe(false)
  })

  // -------------------------------------------------------
  // 4. Validates minimum characters in message
  // -------------------------------------------------------
  it('shows an error when message is shorter than 10 characters', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('#contact-name').setValue('John Doe')
    await wrapper.find('#contact-email').setValue('john@example.com')
    await wrapper.find('#contact-message').setValue('Short')

    await wrapper.find('form').trigger('submit')

    const messageError = wrapper.find('#contact-message-error')
    expect(messageError.exists()).toBe(true)
    expect(messageError.text()).toContain('10 characters')

    // Other fields should be valid
    expect(wrapper.find('#contact-name-error').exists()).toBe(false)
    expect(wrapper.find('#contact-email-error').exists()).toBe(false)
  })

  // -------------------------------------------------------
  // 5. Shows success message after successful submit
  // -------------------------------------------------------
  it('shows success message after a valid form submission', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('#contact-name').setValue('Jane Smith')
    await wrapper.find('#contact-email').setValue('jane@example.com')
    await wrapper.find('#contact-message').setValue('Hello, I would like to discuss a project with you.')

    await wrapper.find('form').trigger('submit')

    // Advance the 1500ms simulated loading delay
    vi.advanceTimersByTime(1500)
    await flushPromises()

    // Form should be replaced by the success state
    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.find('.form-success').exists()).toBe(true)
    expect(wrapper.find('.form-success__title').text()).toBe('Message sent!')
  })
})
