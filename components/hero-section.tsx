"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";

import HeadImage from "@/public/my-image.jpg";
import { AnimatedSection } from "./animated/animated-section";
import {
  floatingVariants,
  presetAnimations,
  pulseVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { motion } from "framer-motion";
import { AnimatedText } from "./animated/animated-text";
import { AnimatedButton } from "./animated/animated-button";
import { touches } from "@/lib/data";

export function HeroSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    "Full Stack Developer",
    "Frontend Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatedSection
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Text Content */}
        <motion.div
          className="space-y-6 text-center lg:text-left"
          variants={staggerItem}
        >
          <motion.div className="space-y-2" variants={staggerItem}>
            <AnimatedText delay={0}>
              <p className="text-lg text-muted-foreground">Hello, I'm</p>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ahmad Mohammad
              </h1>
            </AnimatedText>

            <motion.div className="h-8" variants={staggerItem}>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {text}
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <AnimatedText delay={0.4}>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Passionate Full Stack Developer specializing in modern web
                technologies. I create beautiful, responsive, and user-friendly
                applications that solve real-world problems.
              </p>
            </AnimatedText>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <AnimatedButton
              onClick={() => scrollToSection("projects")}
              className="primary-btn"
            >
              View My Work
              <ExternalLink className="ml-2 h-4 w-4" />
            </AnimatedButton>

            <AnimatedButton
              variant="outline"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
              <Mail className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </div>

          <motion.div
            className="flex gap-4 justify-center lg:justify-start"
            variants={staggerContainer}
          >
            {touches.map((social, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          variants={presetAnimations.scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <motion.div
              className="w-88 h-88 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1 animate-pulse overflow-hidden"
              variants={pulseVariants}
              animate="animate"
            >
              <div className="w-full h-full rounded-full bg-background p-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={HeadImage.src}
                    alt="Ahmad Hossamo"
                    width={400}
                    height={400}
                    className="w-full h-full rounded-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-bounce"
              variants={floatingVariants}
              animate="animate"
            />

            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce delay-300"
              variants={floatingVariants}
              animate="animate"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
