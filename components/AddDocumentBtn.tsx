'use client'; // Indicating this component is intended to run on the client side in Next.js

import React from 'react'; // Importing React library for creating the component
import { Button } from './ui/button'; // Importing the Button component for user interaction
import Image from 'next/image'; // Importing Image component from Next.js for optimized image loading
import { createDocument } from '@/lib/actions/room.actions'; // Importing the function to create a new document from the actions
import { useRouter } from 'next/navigation'; // Importing the router hook from Next.js for navigation

// The AddDocumentBtn component allows the user to create a new document and navigate to its page
const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter(); // Hook to handle navigation in Next.js

  // The addDocumentHandler function is triggered when the button is clicked
  const addDocumentHandler = async () => {
    try {
      // Creating a new document by calling the createDocument function
      const room = await createDocument({ userId, email });

      // If the document is successfully created, redirect to the new document's page
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      // Logging the error if something goes wrong during document creation
      console.log(error);
    }
  };

  return (
    // Wrapper div for the button
    <div>
      {/* Button component for triggering document creation */}
      <Button
        type="submit" // The button type is "submit" since it's intended for form submission
        onClick={addDocumentHandler} // On click, the addDocumentHandler function is called
        className="gradient-blue flex gap-1 shadow-md" // Styling classes for the button
      >
        {/* Image component displaying the "add" icon */}
        <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />

        {/* Hidden text for larger screens that explains the action */}
        <p className="hidden sm:block">Start a blank document</p>
      </Button>
    </div>
  );
};

export default AddDocumentBtn; // Exporting the AddDocumentBtn component for use in other parts of the app
