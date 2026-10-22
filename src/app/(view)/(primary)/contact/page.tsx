
import React from "react";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import { MailIcon, FacebookIcon, GithubIcon } from "@animateicons/react/lucide";
import {
  WhatsappIcon,
  Discord,
  Reddit,
  Dribbble,
} from "@animateicons/react/huge";

const iconClass = "size-10 sm:size-12 md:size-14";

const items = [
  {
    icon: <MailIcon className={iconClass} size={48} />,
    label: "kshsiaan@gmail.com",
    href: "mailto:kshsiaan@gmail.com",
  },
  {
    icon: <GithubIcon className={iconClass} size={48} />,
    label: "kshsiaan",
    href: "https://github.com/kshsiaan",
  },
  {
    icon: <FacebookIcon className={iconClass} size={48} />,
    label: "Shahibul Hasan",
    href: "https://www.facebook.com/profile.php?id=61593380450464",
  },
  {
    icon: <WhatsappIcon className={iconClass} size={48} />,
    label: "+8801936980717",
    href: "https://wa.me/8801936980717",
  },
  {
    icon: <Discord className={iconClass} size={48} />,
    label: "ghum.",
    href: "https://discord.com/users/906291942567059497",
  },
  {
    icon: <Reddit className={iconClass} size={48} />,
    label: "Raven_TheDev",
    href: "https://www.reddit.com/u/Raven_TheDev",
  },
  {
    icon: <Dribbble className={iconClass} size={48} />,
    label: "Shahibul Hasan",
    href: "https://dribbble.com/Raven36",
  },
];

export default function Page() {
  return (
    <main className="w-full lg:w-[50dvw] min-h-dvh flex items-center justify-center px-4 py-8 ">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-6">
        <CursorDrivenParticleTypography
          text="Lets Chat"
          className="w-full border-b h-[16dvh] min-h-28 md:h-[20dvh] hidden lg:block"
        />

        <h1 className="pb-6 lg:hidden">
          <span className="block text-4xl sm:text-5xl md:text-6xl font-heading italic font-extralight text-primary leading-none text-center">
            Lets Chat
          </span>
        </h1>

        <div className="w-full flex flex-wrap justify-center gap-x-2 gap-y-6">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[30%] min-w-24 sm:w-[22%] flex-col items-center justify-center gap-2 text-center"
            >
              {item.icon}

              <p className="text-xs sm:text-sm text-muted-foreground break-words max-w-full">
                {item.label}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
