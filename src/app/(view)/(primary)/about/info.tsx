import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Info() {
  const age = new Date().getFullYear() - 2003;

  const details = [
    { label: "Age", value: age },
    { label: "Based in", value: "Dhaka, Bangladesh" },
    { label: "Coding since", value: "2019" },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science Engineering",
      status: "Present - Uttara, Dhaka, Bangladesh",
      university: "Uttara University",
      link: "https://www.uttara.ac.bd",
    },
    {
      degree: "Diploma in Computer Science & Technology",
      status: "2021 - 2024, Kishoreganj, Bangladesh",
      university: "Kishoreganj Govt. Polytechnic Institute",
      link: "https://kishoreganj.polytech.gov.bd",
    },
  ];

  return (
    <section className="flex min-h-full w-full flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <header className="flex flex-col items-center text-center">
          <div
            className="ann ann-sw ann-no-mark"
            data-note="This is me, Raven."
          >
            <Avatar className="size-32 ring-1 ring-border sm:size-36 md:size-40">
              <AvatarImage
                src="/irl.jpeg"
                alt="Raven"
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-semibold">
                RV
              </AvatarFallback>
            </Avatar>
          </div>

          <p className="mt-5 text-sm text-muted-foreground sm:text-base">
            Full Stack AI Engineer · Artist · Music Producer
          </p>
        </header>

        <dl className="mt-12 grid w-full grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex flex-col items-center px-5 py-5 text-center sm:py-4"
            >
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {detail.label}
              </dt>
              <dd className="mt-2 text-base font-semibold tracking-tight">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* <Separator className="my-10" /> */}

        <div className="w-full mt-10">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Education Status & History:
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
