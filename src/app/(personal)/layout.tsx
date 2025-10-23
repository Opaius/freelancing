import { Mail } from "lucide-react";
import "./personal.css";
import CardNav, { CardNavItem } from "@/components/CardNav";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
export default function PersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      label: "About",
      bg: "var(--color-primary)",
      textColor: "#fff",
      links: [
        {
          label: "My Job Experience",
          ariaLabel: "About Job Experience",
          href: "/about",
        },
      ],
    },
    {
      label: "Projects",
      bg: "var(--color-secondary)",
      textColor: "#fff",
      links: [
        {
          label: "My Projects",
          ariaLabel: "My Projects",
          href: "/projects",
        },
        {
          label: "My Skills",
          ariaLabel: "My Skills",
          href: "/skills",
        },
      ],
    },
    {
      label: "Contact",
      bg: "var(--color-accent)",
      textColor: "var(--color-text)",
      links: [
        {
          label: "Email",
          ariaLabel: "Email me",
          href: "mailto:ciocan.sebastian45@gmail.com",
          icon: <Mail className="w-4 h-4" />,
        },
        {
          label: "Instagram",
          ariaLabel: "Instagram",
          icon: <BsInstagram className="w-4 h-4" />,
          href: "https://instagram.com/ciokydev",
        },
        {
          label: "LinkedIn",
          ariaLabel: "LinkedIn",
          icon: <BsLinkedin className="w-4 h-4" />,
          href: "www.linkedin.com/in/sebastian-ciocan-a5aa5138b",
        },
      ],
    },
  ] as CardNavItem[];
  return (
    <>
      <div className="h-[100px]">
        <CardNav
          logo=""
          logoAlt="Company Logo"
          items={items}
          ease="power3.out"
        />
      </div>

      {children}
    </>
  );
}
