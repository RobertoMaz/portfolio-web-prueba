// Developer profile data — hardcoded for portfolio purposes

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools'
}

export interface DeveloperProfile {
  name: string
  title: string
  tagline: string
  bio: string
  skills: Skill[]
  contactPath: string
}

export const developer: DeveloperProfile = {
  name: 'Alex Rivera',
  title: 'Full Stack Developer',
  tagline: 'I turn complex problems into clean, scalable solutions.',
  bio: 'Passionate about building end-to-end web applications that are fast, accessible, and maintainable. From pixel-perfect UIs to robust APIs — I ship products that work.',
  skills: [
    { name: 'Vue 3', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'Docker', category: 'devops' },
    { name: 'Git', category: 'tools' },
  ],
  contactPath: '/contact',
}
