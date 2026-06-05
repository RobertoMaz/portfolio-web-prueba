import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../components/AboutView.vue'
import { aboutProfile } from '../data/about'

// Router with all app routes so RouterLink resolves hrefs correctly
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/about', component: { template: '<div />' } },
    { path: '/contact', component: { template: '<div />' } },
  ],
})

describe('AboutView', () => {
  it('renders without errors', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the developer name', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.text()).toContain(aboutProfile.name)
  })

  it('displays the developer role', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.text()).toContain(aboutProfile.role)
  })

  it('displays all personal info items', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    for (const item of aboutProfile.personalInfo) {
      expect(wrapper.text()).toContain(item.label)
      expect(wrapper.text()).toContain(item.value)
    }
  })

  it('displays all work values', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    for (const value of aboutProfile.values) {
      expect(wrapper.text()).toContain(value.title)
      expect(wrapper.text()).toContain(value.description)
    }
  })

  it('renders a CTA link pointing to the contact path', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    const ctaLink = wrapper.find('.cta-button')
    expect(ctaLink.exists()).toBe(true)
    // RouterLink renders an <a> tag; verify the resolved href contains /contact
    const href = ctaLink.attributes('href') ?? ''
    expect(href).toContain('contact')
  })

  it('renders the avatar initials', async () => {
    const wrapper = mount(AboutView, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.find('.avatar-initials').text()).toBe(aboutProfile.initials)
  })
})
