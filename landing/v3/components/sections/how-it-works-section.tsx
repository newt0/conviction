import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Mint Phase",
      description: "Choose your conviction strategy and mint your DeFAI Agent NFT with initial capital.",
    },
    {
      number: 2,
      title: "Autonomous Agent Phase",
      description: "Your DeFAI Agent executes your strategy autonomously, making decisions based on market conditions.",
    },
    {
      number: 3,
      title: "Notification Phase",
      description: "Receive Twitter @replies and dashboard updates about your agent's activities and performance.",
    },
    {
      number: 4,
      title: "Exit or Trade Phase",
      description: "Sell your NFT on the marketplace or withdraw your assets when you're ready.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#007CFF] text-white font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-4 text-gray-300">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
