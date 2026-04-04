import './globals.css';
import Navbar from '../components/Navbar';
import { AppProvider } from '../context/AppContext';

export const metadata = {
  title: 'FeedLink — Connecting Food to People Who Need It',
  description: 'AI-powered platform connecting restaurants, NGOs, and volunteers to reduce food waste and fight hunger across India.',
  keywords: 'food donation, hunger, NGO, volunteer, food waste, India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
