export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  github: string;
  webapp: string;
  img: string;
  is_published: boolean;
}

export interface Experience {
  id: number;
  image: string;
  role: string;
  company: string;
  date: string;
  desc: string;
  skills: string[];
  company_logo: string;
}

export interface Education {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
}

export interface Skill {
  name: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
