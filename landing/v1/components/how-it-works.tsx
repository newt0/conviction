import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Coins, RefreshCw, Bell, ArrowRightLeft } from "lucide-react"

export function HowItWorks() {
  const phases = [
    {
      number: 1,
      title: "Mint Phase",
      subtitle: "Choose and Commit",
      icon: <Coins className="h-10 w-10 text-white" />,
      description: [
        "The user selects an NFT that represents a specific investment strategy or ideological theme.",
        "By minting the NFT, the user crystallizes their conviction into a DeFAI Agent.",
        "No further action or decision-making is required from the user.",
      ],
    },
    {
      number: 2,
      title: "Autonomous Phase",
      subtitle: "The Agent Takes Over",
      icon: <RefreshCw className="h-10 w-10 text-white" />,
      description: [
        "The minting amount is transferred to the NFT's Agent Wallet.",
        "The DeFAI Agent begins autonomous execution of its investment logic.",
        "The user can now fully disengage from trading and focus on their life.",
      ],
    },
    {
      number: 3,
      title: "Notification Phase",
      subtitle: "Transparent Updates",
      icon: <Bell className="h-10 w-10 text-white" />,
      description: [
        "A notification Twitter account sends regular @replies to NFT holders:",
        "• Current wallet balance",
        "• P&L since minting",
        "• Latest transaction details",
        "A dashboard UI is also available for performance visibility.",
      ],
    },
    {
      number: 4,
      title: "Exit or Trade Phase",
      subtitle: "Liquidity and Realization",
      icon: <ArrowRightLeft className="h-10 w-10 text-white" />,
      description: [
        "NFTs can be resold on secondary markets.",
        "Funds may be withdrawn from the Agent Wallet:",
        "• Time-lock may apply",
        "• Or floor-price resale may be the only exit path",
      ],
    },
  ]

  const comparisonData = [
    {
      feature: "Fully autonomous Agent",
      experience: "Freedom from active trading, mental load offloaded",
    },
    {
      feature: "Twitter notifications",
      experience: "Peace of mind without constant app checks",
    },
    {
      feature: "Secondary market + Floor price logic",
      experience: "Conviction becomes tradable and liquid",
    },
    {
      feature: "Withdrawal lock mechanism",
      experience: "A UX-native form of long-term staking and conviction holding",
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How ConvictionFi Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ConvictionFi simplifies the crypto experience into four elegant, autonomous phases. Here's how it works.
          </p>
        </div>

        {/* Phases - Horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-t-4 border-t-[#007CFF] shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="absolute -top-5 left-6 bg-[#007CFF] rounded-full p-3 shadow-lg">{phase.icon}</div>
                  <div className="pt-6">
                    <Badge variant="secondary" className="mb-2 bg-blue-50 text-[#007CFF] hover:bg-blue-50">
                      Phase {phase.number}
                    </Badge>
                    <h3 className="text-xl font-bold mb-1">{phase.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{phase.subtitle}</p>
                    <div className="space-y-2">
                      {phase.description.map((item, i) => (
                        <p key={i} className="text-gray-700 text-sm">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 my-12"></div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6EEBFF] to-[#007CFF]">
              The ConvictionFi Experience
            </span>
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2 text-gray-900 font-bold">Feature</TableHead>
                  <TableHead className="w-1/2 text-gray-900 font-bold">User Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.experience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}
