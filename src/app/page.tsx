"use client"

import AnimatedBody from "@/components/Landing-Page/AnimatedBody";
import CTA from "@/components/Landing-Page/CTA";
import Hero from "@/components/Landing-Page/Hero";
import Navbar from "@/components/Landing-Page/Navbar";
import Reviews from "@/components/Landing-Page/Reviews";
import ShowCase from "@/components/Landing-Page/ShowCase";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  return (
      <>
      <Hero />
      <AnimatedBody />
      <ShowCase />
      <Reviews />
      <CTA />
      </>
  );
}
