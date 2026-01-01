import { HeroSection } from "@/components/sections/hero-section";
import { CommonThreatsSection } from "@/components/sections/common-threats-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { SafeHabitsSection } from "@/components/sections/safe-habits-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { MissionSection } from "@/components/sections/mission-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <HeroSection />
      <MissionSection />
      <CommonThreatsSection />
      <SafeHabitsSection />
      <WhyUsSection />
      <NewsletterSection />
    </div>
  );
}
