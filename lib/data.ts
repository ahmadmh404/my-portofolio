import type { Project, Experience, Education, SkillCategory } from "./types";
import { Github, Linkedin, Mail } from "lucide-react";

export const touches = [
  { href: "https://github.com", icon: Github },
  { href: "https://linkedin.com", icon: Linkedin },
  { href: "mailto:your.email@example.com", icon: Mail },
];

export const projects: Project[] = [
  {
    id: 14,
    title: "Auth.js v5 toolkit",
    date: "Jan 2025 - April 2025",
    description:
      "Modern, full-featured authentication system built with Next.js 15, featuring both traditional email/password authentication and OAuth providers (GitHub, Google).",
    tags: [
      "Next Js",
      "Auth.Js v5",
      "Tanstack",
      "Tailwind CSS",
      "Shadcn UI",
      "react-hook-form",
      "react-hot-toast",
    ],
    category: "SASS",
    github: "https://github.com/ahmadmh404/Resume-Builder-Strapi",
    webapp: "https://resume-builder-strapi.vercel.app/",
    img: "/projects/auth-js.png",
    is_published: true,
  },
  {
    id: 2,
    title: "High Five Social Media Platform",
    date: "Jan 2024 - Present",
    description:
      "High Five is a modern, full-stack social media platform that enables users to connect, share content, and interact with friends, High Five provides a seamless social experience across devices.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
      "NextAuth.js",
      "Axios",
      "React Icons",
      "React Hot Toast",
      "Shadcn UI",
      "@tanstack/react-query",
    ],
    category: "WEB",
    github: "https://github.com/ahmadmh404/auth-js-5-toolkit",
    webapp: "https://auth-js-5-toolkit.vercel.app/",
    img: "/projects/highfive.png",
    is_published: false,
  },
  {
    id: 3,
    title: "Smash App Store",
    date: "2024",
    description:
      "Smash is a fully Featured app store with ability to download, purchase, upload, get discounts, badges and complete achievements",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
      "NextAuth.js",
      "Axios",
      "React Icons",
      "React Hot Toast",
      "Shadcn UI",
      "Custom Components builders (made by me)",
      "custom-react-query-package",
    ],
    category: "WEB",
    github: "https://github.com/ahmadmh404/auth-js-5-toolkit",
    webapp: "https://auth-js-5-toolkit.vercel.app/",
    img: "/projects/smash.png",
    is_published: false,
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    image: "/experience-images/university.png",
    role: "Technical Student",
    company: "Institute of Technical Education",
    date: "2020 - Present",
    desc: "Advanced programming courses, technical workshops & lab sessions, computer science fundamentals, team projects & collaboration",
    skills: [
      "Software Development",
      "Web Technologies",
      "Computer Science",
      "Team Collaboration",
    ],
    company_logo: "/experience-images/graduation.png",
  },
  {
    id: 2,
    image: "/experience-images/high-five.png",
    role: "Frontend Lead Developer",
    company: "Social Media Platform (Graduation Project)",
    date: "Sep 2023 - Present",
    desc: "Frontend architecture with Next.js & TypeScript, UI components with ShadcnUI, API integration & real-time features, performance optimization",
    skills: [
      "Next.js",
      "TypeScript",
      "ShadcnUI",
      "Tailwind CSS",
      "API Integration",
      "Performance Optimization",
    ],
    company_logo: "/experience-images/high-five.png",
  },
];

export const education: Education[] = [
  {
    id: 1,
    img: "/education-images/high-school.jpg",
    school: "Zaki Al-Arsozi Secondary School",
    date: "2017 - 2020",
    grade: "82%",
    desc: "Completed secondary education with a focus on mathematics and computing subjects. Developed a strong foundation in logical thinking and problem-solving skills.",
    degree: "Secondary School Certificate",
  },
  {
    id: 2,
    img: "/education-images/university.png",
    school: "Institute of ICTE, Tartous, Syria",
    date: "2020 - Present",
    grade: "3.2 GPA",
    desc: "Currently completing my final year in Information Technology, specializing in software development. My coursework includes advanced web development, database management, and software engineering principles. Notable achievements include leading the development of a social media platform as my graduation project, where I specialized in frontend development using Next.js and TypeScript.",
    degree: "Higher Nitec in Information Technology",
  },
];

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      {
        name: "HTML5",
        image: "/skills/html5.png",
      },
      {
        name: "CSS",
        image: "/skills/css3.png",
      },
      {
        name: "JavaScript",
        image: "/skills/js.png",
      },
      {
        name: "React Js",
        image: "/skills/reactjs.png",
      },
      {
        name: "Tailwind CSS",
        image: "/skills/tailwindcss.png",
      },
      {
        name: "ShadcnUI",
        image: "/skills/shadcnui.png",
      },
      {
        name: "React Hook Form",
        image: "/skills/react-hook-form.png",
      },

      { name: "Zustand", image: "/skills/zustand.png" },
      { name: "Tanstack Quer", image: "/skills/tanstack-query.png" },
      { name: "Framer Motion", image: "/skills/framer.png" },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node Js",
        image: "/skills/nodejs.png",
      },
      {
        name: "Express Js",
        image: "/skills/expressjs.png",
      },
      {
        name: "MongoDB",
        image: "/skills/mongodb.png",
      },
      {
        name: "Prisma ORM",
        image: "/skills/prisma.png",
      },
      {
        name: "Strapi CMS",
        image: "/skills/strapi.png",
      },
    ],
  },
  {
    title: "Others",
    skills: [
      {
        name: "Git",
        image: "/skills/git.png",
      },
      {
        name: "GitHub",
        image: "/skills/github.png",
      },
      {
        name: "Netlify",
        image: "/skills/netlify.png",
      },
      {
        name: "VS Code",
        image: "/skills/vs-code.png",
      },
      {
        name: "Postman",
        image: "/skills/postman.png",
      },
      { name: "Gitlab", image: "/skills/gitlab.png" },
    ],
  },
  {
    title: "Full Stack",
    skills: [
      {
        name: "Next Js",
        image: "/skills/next-js.png",
      },
      {
        name: "Zod",
        image: "/skills/zod.png",
      },
    ],
  },
];
