import { Footer2 } from "@/components/footer2";
import FeaturedTutors from "@/components/HomeConponents/FeaturedTutor";
import HeroSection from "@/components/HomeConponents/Hero";
import HowItWorks from "@/components/HomeConponents/HowItWorks";
import { userService } from "@/services/UserService";

export default async function Home() {
  const { data } = await userService.getSession();
  console.log(data);
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeaturedTutors />
      <Footer2 />
    </div>
  );
}
