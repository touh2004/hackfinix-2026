export interface ThemeMission {
  id: string
  code: string
  title: string
  subtitle: string
  description: string
  industryFocus: string
  problemFocus: string
  expectedOutput: string
  focusAreas: string[]
  icon: string
  slug: string
}

export const themesData: ThemeMission[] = [
  {
    id: '01',
    code: 'MSN-01',
    title: 'SMART MANUFACTURING & INDUSTRY 5.0',
    subtitle: 'Cognitive Automation · Factory Efficiency · Worker Safety',
    description: 'Reimagine the factory floor with predictive maintenance, robotics, and industrial IoT solutions.',
    industryFocus: 'Automotive, aerospace manufacturing, robotics, precision engineering.',
    problemFocus: 'Create AI or IoT solutions for predictive maintenance, factory efficiency, and worker safety.',
    expectedOutput: 'Manufacturing dashboard, digital twin, or smart factory monitoring system.',
    focusAreas: ['Predictive Maintenance', 'Factory Efficiency', 'Worker Safety', 'Robotics & IoT'],
    icon: 'Factory',
    slug: 'smart-manufacturing',
  },
  {
    id: '02',
    code: 'MSN-02',
    title: 'HUMAN–AI COLLABORATION',
    subtitle: 'Augmented Intelligence · Human-in-the-Loop · Productivity',
    description: 'Build AI assistants and human-in-the-loop systems that improve productivity and decision-making.',
    industryFocus: 'AI, IT services, smart manufacturing, enterprise automation, healthcare AI.',
    problemFocus: 'Build AI assistants and human-in-the-loop systems that improve productivity and decision-making.',
    expectedOutput: 'Increased productivity & efficiency, improved decision-making quality, system reliability & safety, skill augmentation, scalable & adaptive project systems, explainable AI dashboard, or collaboration platform.',
    focusAreas: ['Explainable AI', 'Skill Augmentation', 'Safety & Reliability', 'Collaboration Platforms'],
    icon: 'Brain',
    slug: 'human-ai-collaboration',
  },
  {
    id: '03',
    code: 'MSN-03',
    title: 'SUSTAINABILITY & GREEN TECHNOLOGIES',
    subtitle: 'Clean Energy · Carbon Intelligence · Waste Reduction',
    description: 'Develop energy monitoring systems and analytics to monitor and reduce carbon emissions and waste.',
    industryFocus: 'Renewable energy, green manufacturing, ESG compliance.',
    problemFocus: 'Develop solutions to monitor and reduce energy use, carbon emissions, and industrial waste.',
    expectedOutput: 'Carbon tracking dashboard, sustainability analytics platform, or energy monitoring system.',
    focusAreas: ['Carbon Tracking', 'Energy Monitoring', 'ESG Compliance', 'Waste Reduction'],
    icon: 'Leaf',
    slug: 'sustainability-green-tech',
  },
  {
    id: '04',
    code: 'MSN-04',
    title: 'INDUSTRIAL CYBERSECURITY',
    subtitle: 'Threat Detection · OT/IT Security · SOC Intelligence',
    description: 'Build cybersecurity systems to detect and prevent threats in industrial networks and IoT devices.',
    industryFocus: 'Industrial security, cloud security, enterprise cybersecurity.',
    problemFocus: 'Build systems to detect and prevent cyber threats in industrial networks and IoT devices.',
    expectedOutput: 'Threat detection model, SOC dashboard, or cybersecurity monitoring platform.',
    focusAreas: ['Threat Detection', 'OT/IT Cyber Defense', 'SOC Dashboards', 'IoT Network Protection'],
    icon: 'Shield',
    slug: 'industrial-cybersecurity',
  },
]
