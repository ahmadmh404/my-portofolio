"use client";

import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/lib/data";
import Image from "next/image";
import { Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic journey and the foundation of my technical knowledge
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`relative flex items-center  ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gradient-to-b from-chart-1 to-chart-3 rounded-full md:transform md:-translate-x-1.5 z-10"></div>

                {/* Content */}
                <div className={cn("w-full md:w-1/2 ml-12 md:ml-0")}>
                  <Card
                    className={cn(
                      "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                      index % 2 === 0
                        ? "hover:border-chart-1"
                        : "hover:border-chart-3"
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={edu.img || "/placeholder.svg"}
                            alt={edu.school}
                            width={64}
                            height={64}
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {edu.school}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {edu.date}
                            </div>
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              {edu.grade}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {edu.desc}
                      </p>
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
