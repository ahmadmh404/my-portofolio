"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the experiences that shaped my skills
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gradient-to-b from-chart-2 to-chart-4 rounded-full md:transform md:-translate-x-1.5 z-10"></div>

                {/* Content */}
                <div className={cn("w-full md:w-1/2 ml-12 md:ml-0")}>
                  <Card
                    className={cn(
                      "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                      index % 2 === 0
                        ? "hover:border-chart-2"
                        : "hover:border-chart-4"
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={experience.company_logo || "/placeholder.svg"}
                            alt={experience.company}
                            width={48}
                            height={48}
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">
                            {experience.role}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {experience.company}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Calendar className="w-4 h-4 mr-1" />
                            {experience.date}
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {experience.desc}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
