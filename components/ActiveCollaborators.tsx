import { useOthers } from '@liveblocks/react/suspense'; // Importing the hook to get the list of other active collaborators
import Image from 'next/image'; // Importing the Image component for optimized image rendering in Next.js

// ActiveCollaborators component displays a list of current active collaborators
const ActiveCollaborators = () => {
  // Using the useOthers hook to get the others' data (active users or collaborators)
  const others = useOthers();

  // Mapping through the others data to extract collaborator information
  const collaborators = others.map((other) => other.info);

  return (
    // Unordered list to hold the collaborator avatars
    <ul className="collaborators-list">
      {/* Mapping through the list of collaborators to display their avatar and name */}
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          {/* Image component to display the avatar of the collaborator */}
          <Image
            src={avatar} // The avatar URL for each collaborator
            alt={name} // The alt text for the image, which is the name of the collaborator
            width={100} // Setting the width of the image
            height={100} // Setting the height of the image
            className="inline-block size-8 rounded-full ring-2 ring-dark-100" // Tailwind CSS classes for styling (rounded, ring, etc.)
            style={{
              border: `3px solid ${color}`, // Inline style to set a custom border color based on the collaborator's color
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators; // Exporting the ActiveCollaborators component for use in other parts of the application
