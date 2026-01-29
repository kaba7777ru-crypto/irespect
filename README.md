# AI Business Ecosystem Dashboard 🚀

Beautiful Apple-style dashboard for managing your AI-powered business ecosystem.

## Features ✨

- **Apple-style Design** - Beautiful, minimalist interface with smooth animations
- **3 Business Dashboards** - iRespect, Ritual-Service24, Memorial App
- **AI Chat Integration** - Talk to Claude Opus 4.5 for business advice
- **Real-time Metrics** - Track revenue, users, and growth
- **Interactive Charts** - Visualize your business data
- **Responsive Design** - Works on all devices

## Tech Stack 💻

- **Next.js 14** - React framework with App Router
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Anthropic Claude API** - AI chat functionality
- **TypeScript** - Type safety

## Getting Started 🏁

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_key_here
```

Get your key at: https://console.anthropic.com/

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure 📁

```
app/
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx          # Navigation sidebar
│   └── ui/
│       ├── AIChat.tsx            # AI chat component
│       ├── BusinessCard.tsx      # Business cards
│       └── MetricCard.tsx        # Metric display
├── business/
│   ├── irespect/                 # iRespect business page
│   ├── ritual/                   # Ritual-Service24 page
│   └── memorial/                 # Memorial App page
├── api/
│   └── chat/
│       └── route.ts              # Claude API endpoint
└── page.tsx                      # Dashboard homepage
```

## Key Features 🎯

### Dashboard
- Overview of all 3 businesses
- Key metrics and stats
- Quick actions

### Business Pages
- Detailed metrics and charts
- Strategy and roadmap
- Revenue projections

### AI Chat
- Floating chat button (bottom-right)
- Powered by Claude Opus 4.5
- Business-specific advice
- 24/7 availability

## Design Principles 🎨

Following Apple's design language:

- **Rounded corners** (16-24px border-radius)
- **Soft shadows** and depth
- **Smooth animations** (300ms transitions)
- **Minimal whitespace** for breathing room
- **Clear typography** hierarchy
- **Gradient accents** for visual interest

## Color Palette 🎨

```
Primary Blue:    #007AFF
Success Green:   #34C759
Warning Orange:  #FF9500
Error Red:       #FF3B30
Purple:          #AF52DE
Background:      #F5F5F7
Card Background: #FFFFFF
Text Primary:    #1D1D1F
Text Secondary:  #86868B
```

## Scripts 📜

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Next Steps 🚀

1. Add your Anthropic API key for AI chat
2. Customize business data and metrics
3. Connect real data sources
4. Deploy to Vercel

## Deployment 🌐

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

Built with ❤️ using Claude Code and Opus 4.5
