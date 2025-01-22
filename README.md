# Chill Guy LeetCode Analyzer

Welcome to the **Chill Guy LeetCode Analyzer**! This project is designed to help you analyze your LeetCode profile and discover how "chill" you are when it comes to solving coding problems. Whether you're a seasoned coder or just starting out, this tool provides insights into your coding habits, streaks, and overall performance.

## Features

- **Chill Score Calculation**: Get a personalized "Chill Score" based on your LeetCode activity, including problem-solving efficiency, consistency, and ranking.
- **Problem Recommendations**: Receive tailored problem recommendations based on your recent submissions.
- **User Comparison**: Compare your LeetCode profile with up to 5 other users to see who's the chillest coder.
- **Visual Analytics**: View your submission activity and problem difficulty distribution through interactive charts.
- **Shareable Results**: Download your Chill Score as an image or share it on social media.

## How It Works

1. **Enter Your LeetCode Username**: Input your LeetCode username to analyze your profile.
2. **View Your Chill Score**: The tool calculates your Chill Score based on various metrics such as problem-solving efficiency, consistency, and ranking.
3. **Explore Insights**: Dive into detailed statistics, including your submission activity, problem difficulty distribution, and more.
4. **Get Recommendations**: Receive personalized problem recommendations to keep improving.
5. **Compare with Others**: Compare your profile with up to 5 other users to see how you stack up.

## Directory Structure

## Directory Structure

```
poborojo-chill-guy-leetcode/
├── components.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   └── recommendations/
│   │       └── route.ts
│   └── compare/
│       └── page.tsx
├── components/
│   ├── animated-header.tsx
│   ├── back-button.tsx
│   ├── chill-guy-score.tsx
│   ├── comparison-table.tsx
│   ├── footer.tsx
│   ├── problem-recommendations.tsx
│   ├── share-buttons.tsx
│   ├── stats-grid.tsx
│   ├── user-comparison.tsx
│   ├── charts/
│   │   ├── activity-chart.tsx
│   │   ├── chart-wrapper.tsx
│   │   └── difficulty-chart.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── rainbow-button.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── calculateLongestStreak.ts
│   ├── calculateStreak.ts
│   ├── calculations.ts
│   ├── chillMessages.ts
│   ├── constants.ts
│   ├── gemini.ts
│   ├── types.ts
│   ├── utils.ts
│   └── scoring/
│       ├── baseScore.ts
│       ├── consistencyScore.ts
│       ├── efficiencyScore.ts
│       ├── rankingScore.ts
│       └── streakScore.ts
└── public/
    └── chillguy-leetcode.webp
```


## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/poborojo-chill-guy-leetcode.git

2. Navigate to the project directory:
   ```bash
   cd poborojo-chill-guy-leetcode

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

## Running the Project

1. Start the development sevrer:
   ```bash
   npm run dev
   # or
   yarn dev

2. Open your browser and navigate to http://localhost:3000.


## Technologies Used
b applications
  
- **[Next.js](https://nextjs.org/)** - React framework for server-side rendering and static site generation.
  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
  
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript enhancing developer experience.
  
- **[ShadCN UI](https://www.radix-ui.com/)** - Low-level UI primitives for building accessible web applications.
  
- **[Recharts](https://recharts.org/)** - Composable charting library built with React components.

- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library for React to create animations.
  
- **[Google Gemini API](https://ai.google.dev/)** - AI model integration for generating personalized problem recommendations.


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository

2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name

3. Commit your changes:
    ```bash
    git add .
    git commit -m "Add your commit message"
    ```

4. Push your branch:
    ```bash
    git push origin feature/your-feature-name
    ```

5. Open a Pull Request on GitHub

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# Acknowledgments

## Third-Party Services and Libraries

- **LeetCode API**
    - Used for retrieving user data and submission statistics
    - Enables tracking of coding progress and performance

- **Google Gemini**
    - Powers the problem recommendation system
    - Helps provide personalized coding practice suggestions

- **Shadcn UI**
    - Provides the reusable UI component library
    - Enables consistent and professional user interface design

We thank these services and tools for making this project possible.

## Author

Made with ❤️ by Parijat Bhattacharjee (just a chill guy).