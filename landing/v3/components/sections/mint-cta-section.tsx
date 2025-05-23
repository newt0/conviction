import { Button } from "@/components/ui/button"

export function MintCTASection() {
  return (
    <section className="py-16 bg-[#007CFF] text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Mint Your NFT Agent Now</h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Start your automated investment journey with a DeFAI agent that aligns with your conviction.
        </p>
        <Button size="lg" className="bg-white text-[#007CFF] hover:bg-white/90 px-8 font-medium">
          Connect Wallet & Mint
        </Button>
      </div>
    </section>
  )
}
