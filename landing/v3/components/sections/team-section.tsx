import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TeamSection() {
  const team = [
    {
      name: "Kyohei Ito",
      role: "Founder",
      bio: "Former DeFi protocol architect with 8+ years in crypto. Built multiple successful DeFi projects.",
      initials: "K",
    },
    // {
    //   name: "Sarah Johnson",
    //   role: "CTO",
    //   bio: "AI researcher specializing in autonomous agents. PhD in Computer Science from MIT.",
    //   initials: "SJ",
    // },
    // {
    //   name: "Michael Rodriguez",
    //   role: "Head of Strategy",
    //   bio: "Ex-hedge fund manager with expertise in crypto markets and algorithmic trading strategies.",
    //   initials: "MR",
    // },
    // {
    //   name: "Priya Patel",
    //   role: "Lead Developer",
    //   bio: "Full-stack blockchain developer with experience building on Sui, Ethereum, and Solana.",
    //   initials: "PP",
    // },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Who's Behind ConvictionFi?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-[#007CFF] text-white text-xl">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-[#007CFF] font-medium mb-2">{member.role}</p>
              {/* <p className="text-gray-700 text-sm">{member.bio}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
