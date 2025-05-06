# Player Comparison App

A React application for comparing football player statistics side-by-side with a clean, intuitive interface.

![Player Comparison App Screenshot](https://res.cloudinary.com/drxjxycnn/image/upload/v1746519005/player_comparison_app_xch8gl.png)

## Features

- Search and select players from a comprehensive database
- Compare two players side-by-side with detailed statistics
- View season-specific statistics for each player
- Dynamic visualization showing which player excels in specific areas
- Responsive design that works across desktop and mobile devices
- Local storage persistence to remember your selected players

## Technologies Used

- React 19
- TypeScript
- TailwindCSS 4.x
- React Query for data fetching and caching
- React Icons
- Vite for fast building and development

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oluwaseyihassan/playercomparison.git
cd player-comparison
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Type a player name in the search field (at least 2 characters)
2. Select a player from the results to add them to either side
3. Use the season dropdown to view stats from different seasons
4. The statistics panel will highlight which player has superior stats in each category
5. Click "Change Player" to swap out a player for comparison

## Project Structure
src/
├── components/       # UI components
├── Context/          # React Context providers
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and API calls
└── App.tsx           # Main application component

## Deployment

The application is configured for easy deployment to Vercel. Simply connect your GitHub repository to Vercel and it will automatically build and deploy your application.

For manual deployment:
```bash
npm run build
# or
yarn build
```
This will create a production-ready build in the `dist` directory.

## Future Improvements

- Add more statistical categories for comparison
- Implement data visualization with charts
- Add player history and career progression
- Support for comparing more than two players
- Add team comparison features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Football data provided by external API services
- Inspired by the need for easy player comparison tools for fans and analysts

---

Made with ❤️ by [oluwaseyi](https://loseyi.vercel.app)
