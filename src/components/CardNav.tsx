"use client";
import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { Button } from "./ui/button";
import Link from "next/link";
// Removed Framer Motion imports: AnimatePresence, motion

// --- Types (Unchanged) ---
type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
  icon?: ReactNode;
};

export type CardNavItem = {
  label: string;
  bg: string | ReactNode;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
}

// --- Component ---
const CardNav: React.FC<CardNavProps> = ({
  items,
  className = "",
  ease = "power3.out",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // We still use this state to determine which card is hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Ref to hold the element that acts as the moving hover background
  const hoverBgRef = useRef<HTMLSpanElement | null>(null);

  /**
   * Calculates the full expanded height of the navigation.
   * This is crucial for the GSAP timeline's `height` animation.
   */
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        // Temporarily make the content visible and auto-sized to get its natural height
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        // Restore original styles
        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260; // Default desktop height
  };

  /**
   * Creates the main menu open/close GSAP timeline.
   */
  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Initial setup (hidden menu)
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // 1. Animate the nav height
    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    // 2. Animate the cards in with a stagger
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1" // Start cards slightly before height animation is finished
    );

    return tl;
  }, [ease]);

  // --- Main Timeline Effects ---
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useEffect(() => {
    if (!isExpanded) setHoveredIndex(null);
  }, [isExpanded]);

  // --- Resize Handler (Recalculate Height) ---
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        // If expanded, recalculate and immediately set the new height
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        // Kill and recreate timeline to update the target height, then set to end state
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1); // Set to fully expanded state
          tlRef.current = newTl;
        }
      } else {
        // If collapsed, just kill and recreate to get the correct height for next expansion
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, createTimeline]);

  // --- Hover Effect Logic (New GSAP Implementation) ---
  useLayoutEffect(() => {
    const bgEl = hoverBgRef.current;
    const currentHoveredCard =
      hoveredIndex !== null ? cardsRef.current[hoveredIndex] : null;

    if (!bgEl) return;

    if (currentHoveredCard) {
      // Get the position and size of the hovered card relative to the card-nav-content parent
      const parent = currentHoveredCard.closest(
        ".card-nav-content"
      ) as HTMLElement;
      if (!parent) return;

      const cardRect = currentHoveredCard.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      // Calculate transform values for the background element
      const x = cardRect.left - parentRect.left - 5;
      const y = cardRect.top - parentRect.top - 5;
      const width = cardRect.width;
      const height = cardRect.height;

      // Animate the background to match the card's position and size
      gsap.to(bgEl, {
        left: x,
        top: y,
        width: width + 10,
        height: height + 10,
        opacity: 1,
        duration: 0.3, // Transition time
        ease: "power2.out",
      });
    } else {
      // When no card is hovered, fade the background out.
      // We keep its position, but make it invisible.
      gsap.to(bgEl, {
        opacity: 0,
        left: 0,
        top: 0,
        duration: 0.2,
      });
    }
  }, [hoveredIndex]);
  // --- End Hover Effect Logic ---

  /**
   * Toggles the menu open and closed using the GSAP timeline.
   */
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  /**
   * Utility to set the ref for each card element.
   */
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container sticky w-full flex justify-center z-99 top-[1.2em] md:top-[2em] ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? "open" : ""
        } block h-[60px] w-[90%] max-w-[800px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] bg-card`}
      >
        {/* Top Bar (Unchanged) */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-2">
          {/* Hamburger Menu (Unchanged) */}
          <div
            className={`hamburger-menu ${
              isHamburgerOpen ? "open" : ""
            } group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-0`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ease-linear origin-[50%_50%] ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ease-linear origin-[50%_50%] ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-0">
            cioky.dev
          </div>

          <Button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-colors duration-300 text-foreground"
          >
            Get Started
          </Button>
        </div>

        {/* Content Area */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-1 ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {/* GSAP Hover Background Element (Replaces Framer Motion's motion.span) */}
          <span
            ref={hoverBgRef}
            className="absolute rounded-[calc(0.75rem-0.2rem)]
            bg-linear-to-r from-red-400 to-red-600"
            // Start with opacity 0 and set its position/size via GSAP in useLayoutEffect
            style={{
              opacity: 0,
              left: 0,
              top: 0,
              transformOrigin: "top left",
            }}
          />

          {/* Nav Cards */}
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative w-full h-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Content (Unchanged) */}
              <div
                className="flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full  h-full md:min-h-0 md:flex-[1_1_0%] z-50 relative" // Added relative and increased z-index for content to be above the hover background
                ref={setCardRef(idx)}
                style={{
                  backgroundColor:
                    typeof item.bg == "string" ? item.bg : "transparent",
                  color: item.textColor,
                }}
              >
                <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                  {item.label}
                </div>
                <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                  {item.links?.map((lnk, i) => (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                      href={lnk.href}
                      aria-label={lnk.ariaLabel}
                    >
                      {lnk.icon ? (
                        lnk.icon
                      ) : (
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      {lnk.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
