"use client";

import React from "react";
import RevealOnScroll from "./RevealOnScroll";

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export const defaultPrinciples: Principle[] = [
  {
    number: "01",
    title: "Personalised by design",
    description:
      "Every person and every residence is unique. The plan begins with how you actually live, not with a template.",
  },
  {
    number: "02",
    title: "Design and execution in one house",
    description:
      "Drawings and delivery sit under one roof, so intent survives the site. Nothing is handed off and diluted.",
  },
  {
    number: "03",
    title: "Transparent decisions",
    description:
      "Specifications, selections and costs are made visible before work begins, and stay visible while it runs.",
  },
  {
    number: "04",
    title: "Rigorous quality control",
    description:
      "Carefully selected specialists work to defined checks at every stage, from carcass to final finish.",
  },
];

export default function PrincipleList({
  principles = defaultPrinciples,
}: {
  principles?: Principle[];
}) {
  return (
    <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
      {principles.map((item, idx) => (
        <RevealOnScroll key={item.number} delay={idx * 0.1} direction="up">
          <article className="border-t border-[#F7F5F0]/15 pt-8 group hover:border-[#C5A880] transition-colors duration-500">
            <p className="eyebrow text-[#C5A880] font-sans font-semibold">
              {item.number}
            </p>
            <h3 className="mt-4 font-serif text-2xl font-medium text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed font-light text-[#F7F5F0]/70">
              {item.description}
            </p>
          </article>
        </RevealOnScroll>
      ))}
    </div>
  );
}
