import React from "react";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import { MailIcon, FacebookIcon, GithubIcon } from "@animateicons/react/lucide";
import {
  WhatsappIcon,
  Discord,
  Reddit,
  Dribbble,
} from "@animateicons/react/huge";
const items = [
  {
    icon: <MailIcon className="size-14" size={48} />,
    label: "kshsiaan@gmail.com",
    href: "mailto:kshsiaan@gmail.com",
  },
  {
    icon: <GithubIcon className="size-14" size={48} />,
    label: "kshsiaan",
    href: "https://github.com/kshsiaan",
  },
  {
    icon: <FacebookIcon className="size-14" size={48} />,
    label: "Shahibul Hasan",
    href: "https://www.facebook.com/profile.php?id=61593380450464",
  },
  {
    icon: <WhatsappIcon className="size-14" size={48} />,
    label: "+8801936980717",
    href: "http://wa.me/+8801936980717",
  },
  {
    icon: <Discord className="size-14" size={48} />,
    label: "ghum.",
    href: "https://discord.com/users/906291942567059497",
  },
  {
    icon: <Reddit className="size-14" size={48} />,
    label: "Raven_TheDev",
    href: "https://www.reddit.com/u/Raven_TheDev",
  },
  {
    icon: <Dribbble className="size-14" size={48} />,
    label: "Shahibul Hasan",
    href: "https://dribbble.com/Raven36",
  },
];

export default function Page() {
  return (
    <div className=" h-full w-full ">
      <div className="w-[50dvw] flex flex-col items-center justify-center h-full">
        <CursorDrivenParticleTypography
          text="Lets Chat"
          className="border-b h-[20dvh]"
        />
        <div className="w-full grid grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              className="aspect-square flex items-center justify-center flex-col"
              key={item?.label}
            >
              <a href={item?.href} target="_blank" rel="noopener noreferrer">
                {item?.icon}
              </a>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
