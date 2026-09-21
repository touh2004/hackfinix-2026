export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'GENERAL' | 'LOGISTICS' | 'ELIGIBILITY' | 'HACKING'
}

export const faqData: FAQItem[] = [
  {
    id: '01',
    category: 'ELIGIBILITY',
    question: 'Who can enter the HackFinix Arena?',
    answer: 'Students, researchers, self-taught hackers, and early-stage founders from any academic background or location. You can apply as a solo builder or in a crew of up to 4 members. We value grit, technical curiosity, and speed of execution over formal credentials.',
  },
  {
    id: '02',
    category: 'GENERAL',
    question: 'Is participation completely free?',
    answer: '100% Free. Selected participants receive complimentary arena access, 36 hours of high-spec catering & artisanal coffee, travel subsidies (for verified outstation teams), premium hardware kits, and cloud infrastructure.',
  },
  {
    id: '03',
    category: 'HACKING',
    question: 'Can I begin working on my project before the event?',
    answer: 'All code, design systems, and model weights must be created within the official 36-hour hackathon window. Using public open-source libraries, pretrained foundation models, and public APIs is encouraged, but pre-existing private codebases are strictly prohibited.',
  },
  {
    id: '04',
    category: 'LOGISTICS',
    question: 'What hardware & equipment should I bring?',
    answer: 'Bring your laptop, chargers, extension cords, government/student ID, any hardware peripherals or IoT kits you wish to build with, and toiletries/sleeping gear for the designated rest zones.',
  },
  {
    id: '05',
    category: 'ELIGIBILITY',
    question: 'What if I do not have a team yet?',
    answer: 'You can apply solo! We run an official Discord mixer and an in-person Team Formation Protocol at T-00 during check-in to pair you with high-signal complementary teammates.',
  },
  {
    id: '06',
    category: 'HACKING',
    question: 'Who retains intellectual property of projects built?',
    answer: 'You and your team retain 100% full intellectual property and ownership over everything you engineer at HackFinix. Sponsors and organizers claim zero equity or ownership.',
  },
]
