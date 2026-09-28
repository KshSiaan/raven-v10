import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Professional() {
  const education = [
    {
      degree: "Senior Executive, Front-end Engineer",
      status: "( Present - 2026 ) - Mohakhali, Dhaka, Bangladesh",
      university: "SparkTech Agency",
      link: "https://www.sparktech.agency/",
    },
    {
      degree: "Junior Front-end Engineer",
      status: "( 2025 - 2026 ) - Mohakhali, Dhaka, Bangladesh",
      university: "SparkTech Agency",
      link: "https://www.sparktech.agency/",
    },
    {
      degree: "Software Engineer Intern",
      status: "2024 - Mirpur DOHS , Dhaka, Bangladesh",
      university: "Business Automation Systems Ltd.",
      link: "https://ba-systems.com/",
    },
  ];

  return (
    <section className="flex min-h-full w-full flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        {/* <Separator className="my-10" /> */}

        <div className="w-full mt-10">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Career History:
          </h2>

          <div className="mt-6 border-l border-border">
            {education.map((item, index) => (
              <article
                key={`${item.degree}-${index}`}
                className="relative py-1 pl-7 not-last:pb-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-2 size-2.5 rounded-full border border-foreground bg-background"
                />

                <h3 className="text-base font-semibold leading-snug sm:text-lg flex items-center gap-2">
                  {item.degree}{" "}
                  {item.status.includes("Present") && (
                    <div className="size-2! bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.status}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground"
                >
                  {item.university}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
