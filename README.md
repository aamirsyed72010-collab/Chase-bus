# Bus Tracker

A modern, real-time bus tracking application built with Next.js, Material UI (Material You), and Leaflet.

## Features

- **Real-time Bus Tracking**: Visualize bus routes and current locations on an interactive map.
- **Bus Timings**: View detailed schedules, stops, and bus types (Town Bus, Express, Deluxe).
- **Admin Dashboard**: Secure admin interface to manage bus routes, stops, and timings.
- **User Authentication**: Firebase Authentication for secure user login and admin access.
- **Responsive Design**: Fully responsive UI optimized for mobile and desktop devices using Material You design principles.
- **Dark Mode**: Built-in dark mode support for better accessibility and user preference.
- **Localization**: Internationalization support (i18n) for multiple languages.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & MUI System
- **Map**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
- **Authentication**: [Firebase](https://firebase.google.com/)
- **State Management**: React Context & Hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bus-tracker.git
   cd bus-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Access

To access the Admin Dashboard:
1. Log in with the configured admin email (default: `aamir.p@gmail.com`).
2. Navigate to `/admin` or click the "Admin" button in the header.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (BusTimings, DynamicMap, etc.).
- `src/context`: React Context providers (AuthContext, ThemeContext).
- `src/theme.ts`: Material You theme configuration.
- `src/i18n`: Internationalization configuration.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
