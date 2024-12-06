import Image from 'next/image'; // Importing Next.js Image component for optimized images
import React, { useState } from 'react'; // Importing React and useState hook
import UserTypeSelector from './UserTypeSelector'; // Importing the custom UserTypeSelector component
import { Button } from './ui/button'; // Importing the custom Button component
import {
  removeCollaborator,
  updateDocumentAccess,
} from '@/lib/actions/room.actions'; // Importing actions for managing collaborators

// Collaborator component for displaying and managing a collaborator's access to the document
const Collaborator = ({
  roomId, // ID of the room/document
  creatorId, // ID of the document creator
  collaborator, // Data about the collaborator
  email, // Collaborator's email
  user, // Current user (for tracking who is making updates)
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer'); // State to hold collaborator's user type, default to 'viewer'
  const [loading, setLoading] = useState(false); // State to track loading status

  // Handler for updating the collaborator's document access (userType)
  const shareDocumentHandler = async (type: string) => {
    setLoading(true); // Set loading to true when starting the update

    // Update the collaborator's access based on the new user type
    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType, // Cast type to UserType for type safety
      updatedBy: user, // Track who is making the update
    });

    setLoading(false); // Set loading to false after the update is complete
  };

  // Handler for removing a collaborator from the document
  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true); // Set loading to true when starting the removal

    // Call the action to remove the collaborator
    await removeCollaborator({ roomId, email });

    setLoading(false); // Set loading to false after the removal is complete
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        {/* Displaying the collaborator's avatar */}
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          {/* Displaying the collaborator's name and email */}
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && 'updating...'}{' '}
              {/* Display loading text while the action is processing */}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>

      {/* If the current collaborator is the creator, display "Owner", else allow actions */}
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">Owner</p>
      ) : (
        <div className="flex items-center">
          {/* Display the UserTypeSelector component for changing the userType */}
          <UserTypeSelector
            userType={userType as UserType} // Pass the current user type
            setUserType={setUserType || 'viewer'} // Set the function to update the user type
            onClickHandler={shareDocumentHandler} // Call the handler to update access
          />
          {/* Button to remove the collaborator */}
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)} // Call remove handler on click
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator; // Export the Collaborator component
