import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Shield, LineChart, Bell } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Autonomous DeFAI Agent",
      description: "AI-powered agents that execute your investment strategy 24/7 without human intervention.",
      icon: Bot,
    },
    {
      title: "Safe Asset Separation",
      description: "Your assets remain in segregated wallets with transparent on-chain activity.",
      icon: Shield,
    },
    {
      title: "Transparent AI Logic",
      description: "All agent decisions are documented and explained, no black boxes.",
      icon: LineChart,
    },
    {
      title: "Notification + Dashboard Access",
      description: "Stay informed with real-time updates and comprehensive performance analytics.",
      icon: Bell,
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-2 rounded-md bg-[#007CFF]/10 text-[#007CFF]">
                  <feature.icon size={24} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
