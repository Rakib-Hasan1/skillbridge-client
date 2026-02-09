import { Footer2 } from "@/components/footer2";
import FeaturedTutors from "@/components/HomeConponents/FeaturedTutor";
import HeroSection from "@/components/HomeConponents/Hero";
import HowItWorks from "@/components/HomeConponents/HowItWorks";

export default function page() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeaturedTutors />
      <Footer2 />
    </div>
  );
}
