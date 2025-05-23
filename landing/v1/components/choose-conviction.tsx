import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ChooseConviction() {
  const convictions = [
    {
      id: "SUI_MAXIMIZER",
      strategy:
        "Stake SUI via Scallop → Monitor APY via external oracles → Auto-compound rewards or swap to blue-chip assets on Cetus DEX.",
      ideology: "Sui is built for scale. Compounding SUI is a bet on parallelism itself.",
      notes: "Rewards are auto-claimed and rotated based on yield intelligence. No manual touch required.",
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "SUI Maximizer Strategy",
    },
    {
      id: "BTC_HODLER",
      strategy: "Periodic wBTC purchases → Lend for passive income. Low-risk, long-term BTC accumulation.",
      ideology: "In Bitcoin we trust.",
      notes: "Same auto-transfer option as above.",
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "Bitcoin Hodler Strategy",
    },
    {
      id: "STABLE_OPTIMIZER",
      strategy: "Monitor and reallocate USDC/USDT yields across DeFi Protocol.",
      ideology: "Stablecoins are the intelligent choice. Grow capital without price volatility.",
      notes: "Same auto-transfer option as above.",
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "Stable Optimizer Strategy",
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Conviction</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a belief. Mint its logic. Let it trade for you — on Sui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {convictions.map((conviction) => (
            <Card
              key={conviction.id}
              className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={conviction.image || "/placeholder.svg"}
                  alt={conviction.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="pb-2 border-b border-gray-100">
                <CardTitle className="font-mono text-xl text-[#007CFF]">{conviction.id}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-6 flex-grow">
                <div>
                  <h4 className="text-sm font-bold uppercase text-gray-500 mb-2">STRATEGY</h4>
                  <p className="text-gray-700 text-sm">{conviction.strategy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase text-gray-500 mb-2">IDEOLOGY</h4>
                  <p className="text-gray-700 text-sm italic">{conviction.ideology}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase text-gray-500 mb-2">NOTES</h4>
                  <p className="text-gray-700 text-sm">{conviction.notes}</p>
                </div>
              </CardContent>

              <CardFooter className="pt-2 mt-auto">
                <Button className="w-full bg-[#007CFF] hover:bg-[#0069d9] text-white">Mint Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
