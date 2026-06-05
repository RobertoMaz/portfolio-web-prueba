// About page data — Alex Rivera personal profile

export interface PersonalInfo {
  label: string
  value: string
}

export interface WorkValue {
  title: string
  description: string
  icon: string
}

export interface AboutProfile {
  name: string
  initials: string
  role: string
  bio: string
  extendedBio: string
  personalInfo: PersonalInfo[]
  values: WorkValue[]
  contactPath: string
}

export const aboutProfile: AboutProfile = {
  name: 'Alex Rivera',
  initials: 'AR',
  role: 'Full Stack Developer',
  bio: 'Passionate developer with a love for building things that matter. I bridge the gap between great design and solid engineering, crafting digital experiences that are fast, accessible, and built to last.',
  extendedBio:
    'With over 5 years working across the full stack, I have shipped products for startups and established companies alike. I thrive on clear requirements, honest communication, and delivering code that the next developer will actually enjoy reading.',
  personalInfo: [
    { label: 'Location', value: 'Buenos Aires, Argentina' },
    { label: 'Experience', value: '5+ years' },
    { label: 'Specialty', value: 'Vue 3 · Node.js · TypeScript' },
    { label: 'Languages', value: 'Spanish (native) · English (professional)' },
    { label: 'Availability', value: 'Open to freelance projects' },
  ],
  values: [
    {
      title: 'Clean Code First',
      description:
        'Code is written for humans first, machines second. I prioritize readability, maintainability, and clear naming over clever shortcuts.',
      icon: 'code',
    },
    {
      title: 'Honest Communication',
      description:
        'I give realistic estimates, flag risks early, and keep clients informed at every stage. No surprises, no excuses.',
      icon: 'chat',
    },
    {
      title: 'Ship, Then Improve',
      description:
        'A working product in production beats a perfect one stuck in review. I focus on delivering value early and iterating from real feedback.',
      icon: 'rocket',
    },
  ],
  contactPath: '/contact',
}
