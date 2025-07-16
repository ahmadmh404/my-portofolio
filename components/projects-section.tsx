"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { Github, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { AnimatedText } from "./animated/animated-text";
import { AnimatedButton } from "./animated/animated-button";
import { AnimatedCard } from "./animated/animated-card";

const categories = ["ALL", "WEB", "SASS", "MOBILE"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </AnimatedText>
        </div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div key={category} variants={staggerItem}>
              <AnimatedButton
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </AnimatedButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={staggerItem}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AnimatedCard hover={true}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    <motion.div
                      className="relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={project.img || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AnimatedButton size="sm" variant="secondary" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </AnimatedButton>
                        <AnimatedButton size="sm" asChild>
                          <a
                            href={project.webapp}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </a>
                        </AnimatedButton>
                      </motion.div>
                    </motion.div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {project.date}
                        </div>
                      </div>
                      <motion.h3
                        className="text-xl font-semibold group-hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <motion.div
                        className="flex flex-wrap gap-1 mb-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                          <motion.div key={tagIndex} variants={staggerItem}>
                            <Badge variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.tags.length > 4 && (
                          <motion.div variants={staggerItem}>
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 4}
                            </Badge>
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="flex gap-2">
                        <AnimatedButton
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </AnimatedButton>
                        <AnimatedButton size="sm" className="flex-1" asChild>
                          <a
                            href={project.webapp}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </a>
                        </AnimatedButton>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
