import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Mint Your Conviction.</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Let your belief invest on your behalf — as a DeFAI Agent NFT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#007CFF] hover:bg-[#0065cc] text-white px-8">
            Mint Now
          </Button>
          <Button size="lg" variant="outline" className="border-[#007CFF] text-[#007CFF] hover:bg-[#007CFF]/10">
            View Strategies
          </Button>
        </div>
      </div>
    </section>
  )
}
