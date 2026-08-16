export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  label: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    label: 'BACKEND',
    color: 'torch',
    skills: [
      { name: 'Python', level: 9 },
      { name: 'Node.js', level: 7 },
    ],
  },
  {
    label: 'FRONTEND',
    color: 'parchment',
    skills: [
      { name: 'TypeScript', level: 8 },
      { name: 'React', level: 8 },
      { name: 'Next.js', level: 8 },
    ],
  },
  {
    label: 'DATA',
    color: 'sage',
    skills: [
      { name: 'MongoDB / PgSQL', level: 7 },
      { name: 'LLMs & Agents', level: 9 },
    ],
  },
  {
    label: 'DEVOPS',
    color: 'torch',
    skills: [
      { name: 'Docker', level: 7 },
      { name: 'Git', level: 9 },
      { name: 'Azure', level: 7 },
    ],
  },
  {
    label: 'AI TOOLS',
    color: 'amber',
    skills: [
      { name: 'Hugging Face', level: 7 },
      { name: 'Ollama', level: 7 },
      { name: 'LangChain', level: 6 },
      { name: 'ComfyUI', level: 7 },
    ],
  },
];

export default skillCategories;
