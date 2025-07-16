"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { AnimatedSection } from "./animated/animated-section";
import { AnimatedText } from "./animated/animated-text";
import { AnimatedCard } from "./animated/animated-card";

export function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & Technologies
            </h2>
          </AnimatedText>

          <AnimatedText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to
              life
            </p>
          </AnimatedText>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((category, categoryIndex) => (
            <AnimatedCard key={categoryIndex} delay={categoryIndex * 0.1}>
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-cente justify-center flex-wrap gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group/skill"
                      variants={staggerItem}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-10 h-10 relative flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={skill.image || "/placeholder.svg"}
                          alt={skill.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </motion.div>
                      <span className="font-medium text-sm">{skill.name}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
