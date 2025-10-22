"use client";
import Particles from "@/components/Particles";
import { ProfileCard } from "@/components/ProfileCard";
import SplitText from "@/components/SplitText";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDeviceSize } from "@/lib/client/hooks/useDeviceSize";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
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
          checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
          gsap.to(checkoutRef.current, {
            boxShadow: "0 0 15px 5px var(--color-accent)",
            yoyo: true,
            repeat: -1,
            ease: "power3.out",
          });
        });
    }
  }, [startLights]);
  return (
    <div>
      <div className="grid md:grid-cols-3 justify-center items-center w-full relative">
        {startLights && (
          <div className="absolute inset-0 w-full h-full">
            <Particles
              particleColors={["#ffffff", "#f12345"]}
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
          splitType="chars"
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
            splitType="chars"
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
      <section></section>
    </div>
  );
}
