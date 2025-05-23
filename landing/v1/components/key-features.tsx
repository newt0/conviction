import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Shield, FileJson, Bell } from "lucide-react"

export function KeyFeatures() {
  const features = [
    {
      title: "Autonomous DeFAI Agent",
      description:
        "Your belief, minted as an NFT, becomes a fully self-operating investment agent. Trades, monitors, and executes — without you lifting a finger.",
      icon: <Bot className="h-10 w-10 text-[#007CFF]" />,
    },
    {
      title: "Safe Separation of Assets",
      description:
        "Each NFT owns its own smart contract wallet. Your funds are isolated from your personal wallet for safety and clarity.",
      icon: <Shield className="h-10 w-10 text-[#007CFF]" />,
    },
    {
      title: "Transparent AI Logic",
      description:
        "Every strategy is stored as readable JSON metadata on decentralized Walrus storage. Fully auditable, fully programmable.",
      icon: <FileJson className="h-10 w-10 text-[#007CFF]" />,
    },
    {
      title: "Real-Time Notifications & Dashboard",
      description: "Twitter @replies and a real-time dashboard keep you informed. No more app-checking anxiety.",
      icon: <Bell className="h-10 w-10 text-[#007CFF]" />,
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">What makes ConvictionFi uniquely powerful?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
