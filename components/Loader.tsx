import Image from 'next/image'; // Importing Next.js Image component for optimized image handling

// Loader component to display a loading spinner
const Loader = () => {
  return (
    <div className="loader">
      {' '}
      {/* Wrapper div with a 'loader' class for styling */}
      {/* Image component to display the loader icon */}
      <Image
        src="/assets/icons/loader.svg" // Path to the loader icon
        alt="loader" // Alt text for the loader icon for accessibility
        width={32} // Width of the loader icon
        height={32} // Height of the loader icon
        className="animate-spin" // Apply the 'animate-spin' class to make the loader spin
      />
      {/* Text displayed next to the loader icon */}
      Loading...
    </div>
  );
};

export default Loader; // Export the Loader component for use in other parts of the application
