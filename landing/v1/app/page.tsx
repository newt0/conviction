import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/how-it-works";
import { KeyFeatures } from "@/components/key-features";
import { ChooseConviction } from "@/components/choose-conviction";

export default function HeroSection() {
  return (
    <>
      <div className="relative min-h-[90vh] w-full overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#A6EFFF] via-[#6EEBFF] to-[#007CFF] opacity-90" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 lg:px-8">
          {/* Logo container - using the provided ConvictionFi logo */}
          {/* <div className="mb-12">
            <img src="/convictionfi_logo_aqua.png" alt="ConvictionFi Logo" className="h-24 w-auto mx-auto" />
          </div> */}

          {/* Content container */}
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-sm">
              Mint Your Conviction.
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Let your belief invest for you — transparently, safely, and
              autonomously.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#007CFF] hover:bg-white/90 font-medium text-lg px-8"
              >
                Mint Now
              </Button>
              <Button
                size="lg"
                className="bg-white text-[#007CFF] hover:bg-white/90 font-medium text-lg px-8"
              >
                View Strategies
              </Button>
            </div>
          </div>
        </div>
      </div>

      <KeyFeatures />
      <ChooseConviction />
      <HowItWorks />
    </>
  );
}
