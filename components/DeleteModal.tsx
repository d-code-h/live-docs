'use client'; // Indicating this component uses React Client-Side features
import Image from 'next/image'; // Importing the Image component from Next.js for optimized image handling
import { deleteDocument } from '@/lib/actions/room.actions'; // Importing the deleteDocument action from your library
import { useState } from 'react'; // Importing React's useState hook for managing state
import {
  Dialog, // Importing Dialog components from the UI library for modal functionality
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button'; // Importing a custom Button component

// DeleteModal component that accepts roomId as a prop
const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false); // State to control whether the dialog is open or closed
  const [loading, setLoading] = useState(false); // State to track the loading state while deleting the document

  // Function to handle the document deletion
  const deleteDocumentHandler = async () => {
    setLoading(true); // Set loading state to true while the deletion process occurs

    try {
      await deleteDocument(roomId); // Attempt to delete the document using the roomId
      setOpen(false); // Close the modal upon successful deletion
    } catch (error) {
      console.log('Error notif:', error); // Log error if deletion fails
    }

    setLoading(false); // Set loading state back to false once the process is completed
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {' '}
      {/* Dialog component for the modal */}
      <DialogTrigger asChild>
        {/* Button that triggers the modal when clicked */}
        <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all">
          {/* Image for the delete icon */}
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
            className="mt-1"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        {' '}
        {/* Content of the modal */}
        <DialogHeader>
          {/* Delete icon displayed at the top of the modal */}
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          {/* Title of the modal */}
          <DialogTitle>Delete document</DialogTitle>
          {/* Description of the action to confirm deletion */}
          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          {/* Button to close the modal without deleting */}
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancel
          </DialogClose>

          {/* Button to confirm the document deletion */}
          <Button
            variant="destructive" // Styling variant for a destructive (delete) action
            onClick={deleteDocumentHandler} // Trigger the deletion handler
            className="gradient-red w-full"
          >
            {loading ? 'Deleting...' : 'Delete'}{' '}
            {/* Show "Deleting..." if loading, otherwise "Delete" */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal; // Export the DeleteModal component for use in other parts of the application
