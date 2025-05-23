import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StrategiesSection() {
  const strategies = [
    {
      name: "SUI_MAXIMIZER",
      strategy: "Stake SUI via Scallop → Monitor APY → Auto-compound / Cetus DEX",
      ideology: "Sui is built for scale and will become a dominant L1 in the next cycle.",
      notes: "Auto-rotate rewards for maximum yield",
    },
    {
      name: "BTC_HODLER",
      strategy: "Periodic wBTC buys → Lend → Accumulate BTC",
      ideology: "In Bitcoin we trust.",
      notes: "Long-term accumulation strategy",
    },
    {
      name: "STABLE_OPTIMIZER",
      strategy: "Monitor and reallocate USDC/USDT yields across DeFi protocols",
      ideology: "Stablecoins are the intelligent choice.",
      notes: "Risk-adjusted yield optimization",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Sample Conviction Strategies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
            <Card key={strategy.name} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-[#007CFF]">{strategy.name}</CardTitle>
                <CardDescription className="text-sm italic">"{strategy.ideology}"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Strategy:</h4>
                    <p className="text-gray-700">{strategy.strategy}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Notes:</h4>
                    <p className="text-gray-700">{strategy.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
