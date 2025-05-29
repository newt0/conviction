# 🧭 ConvictionFi Design Guide

## 🎨 Brand Identity

| Element       | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| Project Name  | ConvictionFi                                                     |
| Logo          | Gothic-style “C” symbol + ConvictionFi text                      |
| Slogan        | _Mint your Conviction. DeFAI Agent as NFT._                      |
| Color Palette | Monochrome (white, black, gray) + accent in desaturated blue     |
| Typography    | Clean sans-serif (e.g., Inter)                                   |
| Brand Tone    | Calm, resolute, refined, tech-forward, financial professionalism |

## 🧱 Layout Principles

- **Grid layout**: Central container with `max-w-7xl`
- **Section spacing**: Vertical padding `py-20`, section margins `mb-16`
- **Responsive focus**: Desktop-first, with `md:` and `lg:` breakpoints emphasized
- **Card components**: Rounded corners (`rounded-2xl`), shadow (`shadow-md`), padding (`p-4` or more)
- **Icons**: Use Lucide React icons, minimal and symbolic

## 🖥 Component Architecture

### Hero Section

- **Headline**: `text-4xl md:text-6xl font-bold`
- **Subheadline**: `text-xl md:text-2xl text-muted`
- **CTA Button**: `<Button size="lg">` with accent styling

### Step Navigation (How it Works)

- **5-Step Model**: Mint → Deploy → Trade → Evolve → Exit
- **Each Step**: Numbered card with centered layout and subtle animations

### NFT Marketplace

- **Grid layout**: `grid md:grid-cols-3` or greater
- **Card Elements**: NFT thumbnail, strategy name, performance (e.g., last 7 days)

### Dashboard / History

- **Display Mode**: Tables or charts (e.g., with Recharts)
- **Information Hierarchy**: Wallet balance, daily P\&L, agent actions history

## 🧩 UI Libraries & Tech Stack

- `Tailwind CSS`: Utility-first styling
- `shadcn/ui`: Common UI components (Button, Card, Modal, etc.)
- `Lucide Icons`: Minimal and consistent icon set
- `Framer Motion`: Animations (slide-in, fade-in, etc.)
- `Next.js` (App Router) as framework baseline

## 🗣 Tone & Copywriting

- **Voice**: Assertive but not aggressive; uses suggestive rather than imperative language
- **Language**: English-first, tailored to Web3-native audiences
- **Example Phrases**:

  - _"Let your conviction evolve."_
  - _"Powered by Walrus, driven by conviction."_
  - _"Breaking down Web3 barriers with Privy & Wormhole."_

## 🚫 Anti-Patterns / Do-Not-Do

- ❌ Avoid overly colorful palettes – they dilute the brand’s seriousness
- ❌ Avoid playful or cartoonish styles – this is a conviction-based financial product
- ❌ Avoid user decision fatigue – no manual angle/color pickers, use default-safe choices

## 🔧 Optional Extensions

You may later add:

- NFT card hover interactions (scale, opacity, shadow)
- Naming conventions and visual indicators for each strategy (e.g., Trump Bull, AI Indexer)
- Demo screen structure for `/mint`, `/marketplace`, `/dashboard`, etc.
- `tailwind.config.ts` customization (font, breakpoints, spacing)
