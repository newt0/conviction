import { HeroSection } from "@/components/sections/hero-section";
import { WhySection } from "@/components/sections/why-section";
import { StrategiesSection } from "@/components/sections/strategies-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { MintCTASection } from "@/components/sections/mint-cta-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TeamSection } from "@/components/sections/team-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <WhySection />
      <StrategiesSection />
      <HowItWorksSection />
      <MintCTASection />
      <FeaturesSection />
      <TeamSection />
      <FooterSection />
    </main>
  );
}
