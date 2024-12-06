import type { Metadata } from 'next'; // Importing type for metadata configuration in Next.js
import localFont from 'next/font/local'; // Importing the localFont function for custom fonts in Next.js
import './globals.css'; // Importing global CSS styles
import { ClerkProvider } from '@clerk/nextjs'; // Importing ClerkProvider to handle authentication and user management
import { dark } from '@clerk/themes'; // Importing the dark theme for Clerk authentication UI
import Provider from './Provider'; // Importing the custom Provider component for managing real-time collaboration state

// Local font setup using the 'next/font/local' utility for custom fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff', // Path to the custom font file
  variable: '--font-geist-sans', // CSS variable for using the font
  weight: '100 900', // Font weight range (from 100 to 900)
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff', // Path to the custom monospaced font file
  variable: '--font-geist-mono', // CSS variable for using the font
  weight: '100 900', // Font weight range (from 100 to 900)
});

// Metadata for the app (title and description shown in the browser tab)
export const metadata: Metadata = {
  title: 'LiveDocs', // Setting the title of the app
  description: 'Your go-to collaborative editor', // Setting the description of the app
};

// Root layout component for the Next.js app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type definition for the children prop (React nodes)
}>) {
  return (
    // ClerkProvider is used to wrap the app with Clerk authentication context
    <ClerkProvider
      appearance={{
        baseTheme: dark, // Setting the Clerk UI to dark mode
        variables: {
          colorPrimary: '#3371FF', // Setting the primary color for Clerk's UI components
          fontSize: '16px', // Setting the default font size for Clerk's UI components
        },
      }}
    >
      {/* HTML structure for the app */}
      <html lang="en">
        <body
          // Applying custom fonts, base styles, and ensuring a minimum screen height
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          {/* Wrapping the children components with the Provider to enable real-time collaboration */}
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
