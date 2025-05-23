import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Cpu, Shield, Zap, BarChart3, Lock, Users, Layers } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#011829] to-[#4DA2FF]"></div>
            <span className="text-xl font-bold text-[#011829]">ConvictionFi</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
              How It Works
            </a>
            <a href="#architecture" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
              Architecture
            </a>
            <a href="#team" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
              Team
            </a>
            <a href="#faq" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
              FAQ
            </a>
          </nav>
          <Button className="bg-[#011829] hover:bg-[#011829]/90">Connect Wallet</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-[#011829] to-[#4DA2FF] flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#011829] to-[#4DA2FF]"></div>
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#011829] md:text-6xl">ConvictionFi</h1>
            <p className="mb-2 max-w-[42rem] text-xl text-[#011829]/80 md:text-2xl">
              Mint your investment conviction. Let AI do the trading.
            </p>
            <div className="h-1 w-40 bg-gradient-to-r from-[#4DA2FF] to-[#011829] rounded-full mb-8"></div>
            <p className="mb-8 max-w-[42rem] text-lg text-[#011829]/70">
              Focus on your life. Let your conviction invest for you.
            </p>
            <Button className="bg-[#4DA2FF] hover:bg-[#4DA2FF]/90 text-white px-8 py-6 text-lg rounded-full">
              Mint Your Conviction <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-[#f8fafc]">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#011829] md:text-4xl">Redefining DeFi Investment</h2>
              <p className="mt-4 text-lg text-[#011829]/70 max-w-[42rem] mx-auto">
                ConvictionFi combines NFTs, AI, and DeFi to create a seamless investment experience on the Sui
                blockchain.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-[#4DA2FF]" />}
                title="Conviction NFTs"
                description="Mint an NFT that represents your investment strategy and risk tolerance."
              />
              <FeatureCard
                icon={<Cpu className="h-10 w-10 text-[#4DA2FF]" />}
                title="AI-Powered Trading"
                description="Automated trading agents execute strategies based on your conviction parameters."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-[#4DA2FF]" />}
                title="Frictionless Onboarding"
                description="Simple sign-in via zkLogin and Privy for a Web2-like experience."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-[#4DA2FF]" />}
                title="Performance Tracking"
                description="Real-time analytics and insights on your investment performance."
              />
              <FeatureCard
                icon={<Lock className="h-10 w-10 text-[#4DA2FF]" />}
                title="Secure Infrastructure"
                description="Built on Sui blockchain for enhanced security and scalability."
              />
              <FeatureCard
                icon={<Layers className="h-10 w-10 text-[#4DA2FF]" />}
                title="Persistent Metadata"
                description="Reliable storage with Walrus ensures your strategy persists."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#011829] md:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-[#011829]/70 max-w-[42rem] mx-auto">
                A simple three-step process to put your investment on autopilot.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 h-16 w-16 rounded-full bg-[#011829]/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#011829]">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#011829]">Mint Your Conviction</h3>
                <p className="text-[#011829]/70">
                  Create an NFT that encodes your investment preferences, risk tolerance, and strategy.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 h-16 w-16 rounded-full bg-[#011829]/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#011829]">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#011829]">AI Analyzes Markets</h3>
                <p className="text-[#011829]/70">
                  Our AI agents continuously monitor market conditions and identify opportunities.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 h-16 w-16 rounded-full bg-[#011829]/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#011829]">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#011829]">Automated Trading</h3>
                <p className="text-[#011829]/70">
                  Trading agents execute transactions based on your conviction parameters and market analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-20 bg-[#011829] text-white">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Technical Architecture</h2>
              <p className="mt-4 text-lg text-white/70 max-w-[42rem] mx-auto">
                Built on cutting-edge Web3 technologies for reliability and performance.
              </p>
            </div>
            <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 bg-[#011829]/30">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="ai">AI Layer</TabsTrigger>
              </TabsList>
              <TabsContent value="frontend" className="mt-6 p-6 bg-[#011829]/20 rounded-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4">User Experience</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>zkLogin for passwordless authentication</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Privy integration for wallet management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Responsive dashboard for performance tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Real-time notifications and alerts</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full md:w-64 h-64 bg-[#011829]/30 rounded-lg flex items-center justify-center">
                    <div className="w-40 h-40 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-[#4DA2FF]/20"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#4DA2FF]/30"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-[#4DA2FF]/40"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-[#4DA2FF]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="blockchain" className="mt-6 p-6 bg-[#011829]/20 rounded-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4">Sui Blockchain</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>NFT smart contracts for conviction representation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Sui Agent Kit for automated trading</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Walrus for persistent metadata storage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>High throughput and low gas fees</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full md:w-64 h-64 bg-[#011829]/30 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-3 grid-rows-3 gap-2">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="w-10 h-10 bg-[#4DA2FF]/20 rounded flex items-center justify-center">
                          <div className="w-6 h-6 bg-[#4DA2FF]/40 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ai" className="mt-6 p-6 bg-[#011829]/20 rounded-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4">AI Trading Agents</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Market analysis and pattern recognition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Risk assessment and management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Strategy optimization based on performance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4DA2FF]"></div>
                        <span>Autonomous decision-making within parameters</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full md:w-64 h-64 bg-[#011829]/30 rounded-lg flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <div className="absolute w-full h-1 bg-[#4DA2FF]/30 top-1/4 left-0"></div>
                      <div className="absolute w-full h-1 bg-[#4DA2FF]/30 top-2/4 left-0"></div>
                      <div className="absolute w-full h-1 bg-[#4DA2FF]/30 top-3/4 left-0"></div>
                      <div className="absolute h-full w-1 bg-[#4DA2FF]/30 left-1/4 top-0"></div>
                      <div className="absolute h-full w-1 bg-[#4DA2FF]/30 left-2/4 top-0"></div>
                      <div className="absolute h-full w-1 bg-[#4DA2FF]/30 left-3/4 top-0"></div>
                      <div className="absolute w-4 h-4 bg-[#4DA2FF] rounded-full top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute w-4 h-4 bg-[#4DA2FF] rounded-full top-2/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute w-4 h-4 bg-[#4DA2FF] rounded-full top-3/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#011829] md:text-4xl">Our Team</h2>
              <p className="mt-4 text-lg text-[#011829]/70 max-w-[42rem] mx-auto">
                A diverse group of experts in blockchain, AI, and finance.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <TeamMember name="Alex Chen" role="Founder & CEO" background="Former Sui Protocol Engineer" />
              <TeamMember name="Sophia Rodriguez" role="CTO" background="AI Research Scientist" />
              <TeamMember name="Marcus Johnson" role="Head of DeFi" background="Ex-Goldman Sachs, Crypto Veteran" />
              <TeamMember name="Aisha Patel" role="Lead Developer" background="Full-stack Blockchain Engineer" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gradient-to-b from-white to-[#f8fafc]">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#011829] md:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-[#011829]/70 max-w-[42rem] mx-auto">
                Everything you need to know about ConvictionFi.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[#011829]">What is a Conviction NFT?</AccordionTrigger>
                  <AccordionContent className="text-[#011829]/70">
                    A Conviction NFT is a digital asset that represents your investment strategy, risk tolerance, and
                    financial goals. It serves as a configuration for our AI trading agents, which execute trades on
                    your behalf based on these parameters.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-[#011829]">How do the AI trading agents work?</AccordionTrigger>
                  <AccordionContent className="text-[#011829]/70">
                    Our AI trading agents analyze market data, identify patterns, and execute trades based on your
                    Conviction NFT parameters. They continuously learn and adapt to market conditions to optimize your
                    investment strategy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-[#011829]">What is zkLogin and how does it work?</AccordionTrigger>
                  <AccordionContent className="text-[#011829]/70">
                    zkLogin is a zero-knowledge proof-based authentication system that allows you to sign in with your
                    existing social accounts (Google, Twitter, etc.) without revealing your identity to the blockchain.
                    It provides a seamless Web2-like experience while maintaining the security of Web3.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-[#011829]">What fees does ConvictionFi charge?</AccordionTrigger>
                  <AccordionContent className="text-[#011829]/70">
                    ConvictionFi charges a small performance fee on profits generated by the AI trading agents. There
                    are no management fees or hidden charges. You only pay when your investment performs well.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-[#011829]">Is my investment safe?</AccordionTrigger>
                  <AccordionContent className="text-[#011829]/70">
                    ConvictionFi employs multiple security measures to protect your assets. All smart contracts are
                    audited by leading security firms, and the Sui blockchain provides robust security guarantees.
                    However, as with any investment, there are inherent risks in DeFi markets.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-[#011829] text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold md:text-4xl mb-6">Ready to Transform Your Investment Strategy?</h2>
            <p className="mb-8 text-lg text-white/70 max-w-[42rem] mx-auto">
              Join the future of automated DeFi investing with ConvictionFi.
            </p>
            <Button className="bg-[#4DA2FF] hover:bg-[#4DA2FF]/90 text-white px-8 py-6 text-lg rounded-full">
              Mint Your Conviction <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-6 text-sm text-white/50">
              No coding required. No complex setup. Just mint and let AI do the rest.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#011829] to-[#4DA2FF]"></div>
              <span className="text-xl font-bold text-[#011829]">ConvictionFi</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <a href="#features" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
                How It Works
              </a>
              <a href="#architecture" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
                Architecture
              </a>
              <a href="#team" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
                Team
              </a>
              <a href="#faq" className="text-sm font-medium text-[#011829]/80 hover:text-[#011829]">
                FAQ
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-[#011829]/60">
            &copy; {new Date().getFullYear()} ConvictionFi. All rights reserved. Built on Sui Blockchain.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-[#011829]">{title}</h3>
        <p className="text-[#011829]/70">{description}</p>
      </CardContent>
    </Card>
  )
}

function TeamMember({ name, role, background }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#011829]/10 to-[#4DA2FF]/30 flex items-center justify-center">
        <Users className="h-12 w-12 text-[#4DA2FF]" />
      </div>
      <h3 className="mb-1 text-lg font-bold text-[#011829]">{name}</h3>
      <p className="mb-1 text-[#4DA2FF] font-medium">{role}</p>
      <p className="text-sm text-[#011829]/70">{background}</p>
    </div>
  )
}
