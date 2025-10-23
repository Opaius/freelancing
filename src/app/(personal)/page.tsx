"use client";
import Particles from "@/components/Particles";
import { ProfileCard } from "@/components/ProfileCard";
import SplitText from "@/components/SplitText";
import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { useDeviceSize } from "@/lib/client/hooks/useDeviceSize";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(ScrollTrigger, Flip);

const slugs = [
  "typescript",
  "react",
  "html5",
  "css",
  "nodedotjs",
  "nextdotjs",
  "postgresql",
  "docker",
  "git",
  "github",
  "figma",
  "tailwindcss",
  "bun",
];
const toolDescriptions = {
  typescript:
    "I typically use TypeScript to add strong typing and better structure to my code, helping prevent runtime errors and making large projects easier to maintain.",
  react:
    "I use React for building fast, dynamic user interfaces — it’s my go-to for anything involving reusable components and reactive state.",
  html5:
    "HTML5 is the foundation of everything I build on the web — I use it to structure content semantically and ensure solid accessibility.",
  css: "I rely on CSS to bring my designs to life, crafting smooth layouts, responsive styles, and subtle animations.",
  nodedotjs:
    "Node.js is what I use for server-side logic, APIs, and full-stack JavaScript development — it keeps everything in one language.",
  nextdotjs:
    "Next.js is my favorite React framework for building fast, SEO-friendly apps with built-in routing, SSR, and API routes.",
  postgresql:
    "I use PostgreSQL when I need a powerful, reliable database that handles complex queries and structured data gracefully.",
  docker:
    "Docker helps me containerize and deploy apps easily, ensuring consistent environments between development and production.",
  git: "Git is essential for version control — I use it daily to track changes, experiment safely, and collaborate efficiently.",
  github:
    "GitHub is where I host code, manage issues, and collaborate on projects with others or across my own repositories.",
  figma:
    "I use Figma for designing interfaces and prototypes, bridging the gap between creative ideas and actual implementation.",
  tailwindcss:
    "Tailwind CSS is my styling shortcut — I use its utility classes to design fast, clean, and consistent UIs.",
  bun: "Bun is my new favorite runtime and package manager — I use it for its speed and simplicity when building modern JavaScript apps.",
};
const whoAmI = [
  { title: "I'm Sebi." },
  { title: "A creative full-stack developer from Romania." },
  { title: "I craft fast, beautiful, human-feeling web apps." },
  { title: "I speak NextJS, React, and design fluently." },
  { title: "I believe code should feel like art." },
  { title: "I love turning small ideas into big realities." },
  { title: "Sometimes, I overthink transitions." },
  { title: "But that’s how the magic happens." },
  { title: "Let's build something amazing together." },
];
export default function Home() {
  const [startSecondAnimation, setStartSecondAnimation] = useState(false);
  const handleFirstAnimationComplete = useCallback(() => {
    setStartSecondAnimation(true);
  }, []);

  const [startLights, setStartLights] = useState(false);
  const handleSecondAnimationComplete = useCallback(() => {
    setStartLights(true);
  }, []);
  const deviceSize = useDeviceSize();
  const checkoutRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (checkoutRef.current && startLights) {
      gsap
        .from(checkoutRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.6,
          delay: 1,
          ease: "power3.out",
        })
        .then(() => {
          gsap.to(checkoutRef.current, {
            boxShadow: "0 0 15px 5px var(--color-accent)",
            yoyo: true,
            repeat: -1,
            ease: "power3.out",
          });
        });
    }
  }, [startLights]);
  useEffect(() => {
    const boxes = gsap.utils.toArray<HTMLDivElement>(".gsap-whoami-box");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gsap-whoami-box",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
    });

    tl.fromTo(
      boxes,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        ease: "power1.out",
      }
    );
  }, []);

  const images = useMemo(
    () => slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`),
    []
  );
  const [currentIcon, setCurrentIcon] = useState<string | null>(null);
  const handleIconChange = useCallback((iconString: string) => {
    setCurrentIcon(iconString);
  }, []);
  const currentIconSlug = currentIcon?.split("/").reverse()[0];
  useEffect(() => {
    if (currentIcon) {
      const timer = setTimeout(() => {
        setCurrentIcon(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIcon]);

  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [visibleIcon, setVisibleIcon] = useState(currentIcon);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentIcon) {
      setVisibleIcon(currentIcon);
      setIsAnimatingOut(false);

      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotationX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )
        .fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          titleRef.current,
          {
            y: -5,
            duration: 0.3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
          },
          "-=0.1"
        );
    } else if (visibleIcon) {
      // Animate everything back out
      const tl = gsap.timeline({
        onComplete: () => {
          setVisibleIcon(null);
          setIsAnimatingOut(false);
        },
      });

      tl.to([titleRef.current, descRef.current], {
        opacity: 0,
        y: -30,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [currentIcon, visibleIcon, isAnimatingOut]);

  // Store the previous icon cloud position
  const prevIconCloudY = useRef<number>(0);

  // Handle icon info animation when visibleIcon changes
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const iconCloud = containerRef.current.querySelector(".icon-cloud");
    const iconInfo = containerRef.current.querySelector(".icon-info");

    if (!iconCloud) return;

    const iconCloudElement = iconCloud as HTMLElement;
    const currentY = iconCloudElement.getBoundingClientRect().top;
    const diff = prevIconCloudY.current - currentY;

    if (diff !== 0 && prevIconCloudY.current !== 0) {
      // Immediately set the offset position (no jitter)
      gsap.set(iconCloudElement, { y: diff });

      // Then animate to final position
      gsap.to(iconCloudElement, {
        y: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }

    prevIconCloudY.current = currentY;

    // Animate in the icon info if it exists
    if (iconInfo && visibleIcon) {
      gsap.fromTo(
        iconInfo,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.4)",
          delay: 0.2,
        }
      );
    }
  }, [visibleIcon]);
  return (
    <div>
      <div className="grid md:grid-cols-3 justify-center items-center w-full relative">
        {startLights && (
          <div className="absolute inset-0 w-full h-full">
            <Particles
              particleColors={[
                "var(--color-background)",
                "var(--color-primary-500)",
              ]}
              particleCount={1000}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        )}
        <SplitText
          text={
            deviceSize.isGreaterOrEqual("md")
              ? "Wanna bring your business to life?"
              : "Wanna bring your business to life? \n I can help you with that!"
          }
          className="md:text-5xl text-3xl font-semibold text-center mx-20"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="200px"
          textAlign="center"
          onLetterAnimationComplete={
            deviceSize.isGreaterOrEqual("md")
              ? handleFirstAnimationComplete
              : handleSecondAnimationComplete
          }
        />
        <ProfileCard />
        {startSecondAnimation && deviceSize.isGreaterOrEqual("md") && (
          <SplitText
            key="second-animation"
            text="I can help you with that!"
            className="md:text-5xl text-3xl font-semibold text-center mx-20"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
            onLetterAnimationComplete={handleSecondAnimationComplete}
          />
        )}
        {startLights && (
          <div className="flex w-full justify-center absolute bottom-0">
            <div
              ref={checkoutRef}
              className="bg-primary w-[200px] h-[100px] flex flex-col rounded-full items-center justify-center"
            >
              <ChevronDown />
              Checkout More
            </div>
          </div>
        )}
      </div>
      <section className="bg-linear-to-b from-transparent relative to-primary-700 w-full h-full grid md:grid-cols-2 items-center justify-center">
        <div className="p-5 md:m-20 rounded-md">
          <SplitText
            key="third-animation"
            text="Who am I?"
            className="bg-secondary-300 p-4 rounded-lg md:text-5xl text-3xl font-semibold text-center mx-20 mb-8"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whoAmI.map((item, index) => (
                <div
                  key={index}
                  className="gsap-whoami-box group relative p-4 rounded-lg text-sm font-medium leading-snug transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, var(--color-secondary-${
                      300 + (index % 6) * 100
                    }) 0%, var(--color-secondary-${
                      400 + (index % 6) * 100
                    }) 100%)`,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    color: "var(--color-secondary-foreground)",
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="relative z-10">{item.title}</div>
                  <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          className="size-full flex md:flex-col  flex-col-reverse items-center justify-center"
        >
          <div className="icon-cloud">
            <IconCloud
              images={images}
              onIconChange={handleIconChange}
              width={deviceSize.isGreaterOrEqual("md") ? 400 : 325}
              height={deviceSize.isGreaterOrEqual("md") ? 400 : 325}
              focusedIcon={visibleIcon}
            />
          </div>
          {visibleIcon && (
            <div className="icon-info flex flex-col gap-4 items-center ">
              <div
                ref={titleRef}
                className="bg-accent-400 p-4 flex gap-2 rounded-lg items-center capitalize opacity-0"
              >
                <img
                  width={24}
                  height={24}
                  src={visibleIcon}
                  alt={visibleIcon.split("/").reverse()[0] || ""}
                />
                {visibleIcon.split("/").reverse()[0]}
              </div>
              <div
                ref={descRef}
                className="gsap-icon-description bg-accent-400 p-4 rounded-lg opacity-0 max-w-xs text-center"
              >
                {
                  toolDescriptions[
                    visibleIcon
                      .split("/")
                      .reverse()[0] as keyof typeof toolDescriptions
                  ]
                }
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
