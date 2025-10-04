# 🌟 SkyStories

A kid-friendly digital story app where children can experience stories about **space weather** told from the perspectives of different characters (farmer, pilot, astronaut, power grid operator, general public).

## ✨ Features

- **Interactive Storytelling**: Call-based UI where characters appear one at a time
- **Multiple Perspectives**: Hear from 5 different characters about space weather
- **Cosmic Theme**: Beautiful aurora backgrounds and space aesthetics
- **Smooth Animations**: Powered by Framer Motion for engaging transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Tech Stack**: Built with Next.js 14, React, TailwindCSS, and Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skystories
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
app/
├── components/
│   ├── AuroraBackground.tsx    # Animated cosmic background
│   ├── CharacterCard.tsx       # Individual character display
│   ├── CallUI.tsx             # Main story interface
│   └── Navbar.tsx             # Navigation header
├── story/
│   └── page.tsx               # Story page
├── end/
│   └── page.tsx               # End page
├── utils/
│   └── aiPlaceholders.ts      # AI integration placeholders
├── globals.css                # Global styles and animations
├── layout.tsx                 # Root layout
└── page.tsx                   # Landing page

public/
└── images/
    ├── farmer.svg             # Character avatars
    ├── pilot.svg
    ├── astronaut.svg
    ├── operator.svg
    └── public.svg
```

## 🎨 Design System

### Colors
- **Cosmic Purple**: `#8b5cf6`
- **Cosmic Pink**: `#ec4899` 
- **Cosmic Blue**: `#3b82f6`
- **Cosmic Green**: `#10b981`

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Animations
- **Aurora Background**: Slow-moving gradient animation
- **Character Entry**: Slide and fade transitions
- **Hover Effects**: Scale and glow animations
- **Floating Elements**: Subtle movement patterns

## 🧩 Characters

1. **👩‍🌾 Farmer Sarah** - GPS and agricultural impacts
2. **👨‍✈️ Captain Mike** - Aviation and navigation
3. **👩‍🚀 Commander Alex** - Space perspective and astronaut safety
4. **⚡ Grid Operator Lisa** - Power grid and electrical systems
5. **🙂 Community Member** - General public and everyday impacts

## 🔮 Future Enhancements

- **AI Integration**: Replace placeholder functions with real AI text and image generation
- **Sound Effects**: Add audio for character interactions
- **More Characters**: Expand the story with additional perspectives
- **Interactive Elements**: Add clickable elements and mini-games
- **Progress Tracking**: Save user progress and preferences
- **Multi-language Support**: Translate stories to different languages

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion 11
- **Fonts**: Google Fonts (Poppins)
- **TypeScript**: Full type safety

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Educational Goals

This app helps children learn about:
- Space weather and solar activity
- How technology is affected by space weather
- Different career perspectives on space science
- The interconnectedness of our world
- Scientific concepts in an engaging way

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for space weather education and storytelling.
