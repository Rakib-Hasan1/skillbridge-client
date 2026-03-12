"use client";
import { Footer2 } from "@/components/footer2";
import FeaturedTutors from "@/components/HomeConponents/FeaturedTutor";
import Hero from "@/components/HomeConponents/Hero";
import HeroSearch from "@/components/HomeConponents/HeroSearch";

import HowItWorks from "@/components/HomeConponents/HowItWorks";
import TutorResults from "@/components/HomeConponents/TutorResult";
import { Tutor } from "@/types";
import { useState } from "react";

export default function Home() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  return (
    <div>
      <Hero/>
      <HeroSearch setTutors={setTutors} />
      <TutorResults tutors={tutors} />
      <HowItWorks />
      <FeaturedTutors />
      <Footer2 />
    </div>
  );
}
