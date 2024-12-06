import { cn } from '@/lib/utils'; // Importing a utility function to conditionally join class names
import Image from 'next/image'; // Importing Next.js Image component for optimized image handling
import Link from 'next/link'; // Importing Next.js Link component for navigation

// Header component that accepts children and an optional className prop
const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn('header', className)}>
      {' '}
      {/* Container div with a dynamic class based on the 'className' prop */}
      {/* Link component wrapping the logo for navigation to the home page */}
      <Link href="/" className="md:flex-1">
        {/* Image component for the logo with text, visible only on medium and larger screens */}
        <Image
          src="/assets/icons/logo.svg" // Path to the logo with text
          alt="Logo with name" // Alt text for accessibility
          width={120} // Width of the logo
          height={32} // Height of the logo
          className="hidden md:block" // Hide on smaller screens, display on medium and larger screens
        />
        {/* Image component for the logo icon, visible only on small screens */}
        <Image
          src="/assets/icons/logo-icon.svg" // Path to the logo icon
          alt="Logo without name" // Alt text for accessibility
          width={32} // Width of the logo icon
          height={32} // Height of the logo icon
          className="mr-2 md:hidden" // Display on small screens and hide on medium and larger screens
        />
      </Link>
      {/* Render any child elements passed to the Header component */}
      {children}
    </div>
  );
};

export default Header; // Export the Header component for use in other parts of the application
