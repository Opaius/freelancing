"use client";

import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import LetterGlitch from "./LetterGlitch";

export function ProfileCard() {
  return (
    <CardContainer className="w-[320px] h-[500px] md:w-[400px] md:h-[600px] shadow-[0_0_4px_5px_rgba(241,116,116,0.10),0_0_10px_5px_#2E0505] pb-0 relative pt-10 group">
      <div className="absolute inset-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          glitchColors={[
            "rgb(200, 81, 81)",
            "rgb(139, 14, 14)",
            "rgb(208, 166, 251)",
          ]}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
        />
      </div>
      <CardBody className="flex flex-col justify-center items-center w-full h-full px-0">
        <CardItem
          translateZ={50}
          className="bg-background/20 backdrop-blur-xs p-5 rounded-full group-hover:bg-primary/20"
        >
          <p className="text-2xl text-center font-normal">Cioky</p>
          <p className="text-md font-extralight">Fullstack Developer</p>
        </CardItem>

        <div className="h-full w-full relative ">
          <CardItem
            translateZ={50}
            translateX={-20}
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <Image
              src="/cioky.png"
              alt="profile"
              fill
              className="object-cover object-bottom"
            />
          </CardItem>
          <CardItem
            translateZ={90}
            className="absolute bottom-[40px] left-0 w-full flex items-center px-[30px]"
          >
            <div className="bg-background rounded-md p-[10px] flex gap-[10px] w-full justify-center items-center">
              <Avatar className="size-[50px] bg-primary">
                <AvatarImage src="/cioky.png" className="object-cover" />
              </Avatar>
              <div className="flex flex-col">
                <p className="text-md font-bold">@ciokydev</p>
                <p className="text-md text-green-300">Online</p>
              </div>
              <Button className="text-foreground ml-auto rounded-md">
                Contact me
              </Button>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
