import Image from 'next/image';
import { useMutation, useStorage } from '@liveblocks/react/suspense'; // Import hooks from Liveblocks to manage state and mutation.
import { useEffect, useRef, useState } from 'react'; // Import React hooks for managing state and effects.
import { Input } from './ui/input'; // Import custom Input component.
import { updateDocument } from '@/lib/actions/room.actions'; // Import action to update the document title.

const Title = ({ roomId, currentUserType }: CollaborativeRoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null); // Reference for the container to detect clicks outside.
  const inputRef = useRef<HTMLInputElement>(null); // Reference for the input field to focus on it when editing.
  const [editing, setEditing] = useState(false); // State to track whether the title is in edit mode.
  const [loading, setLoading] = useState(false); // State to track whether the title is being saved.
  const title = useStorage((root) => root.room.title); // Fetch the current title from Liveblocks storage.

  console.log('Title', title); // Log the current title (for debugging).

  // Mutation function to update the title in the Liveblocks storage.
  const updateTitle = useMutation(({ storage }, newTitle: string) => {
    const room = storage.get('room'); // Get the room from the storage.
    room.set('title', newTitle); // Set the new title in the storage.
  }, []);

  // Event handler for when the user presses the Enter key while editing the title.
  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setLoading(true); // Set loading state when saving the title.

      try {
        // Save the title using the updateDocument action.
        await updateDocument(roomId, title);
        setEditing(false); // Exit editing mode after saving.
      } catch (error) {
        console.log(error); // Log any errors that occur.
      }

      setLoading(false); // Reset the loading state after saving.
    }
  };

  // Effect to handle clicks outside the title container to exit edit mode.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false); // Exit edit mode when clicked outside.
        updateDocument(roomId, title); // Save the title when clicking outside.
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Add event listener to detect clicks outside.

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener.
    };
  }, [roomId, title]); // Re-run the effect when roomId or title changes.

  // Effect to focus the input when entering edit mode.
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus(); // Focus the input field when editing starts.
    }
  }, [editing]);

  return (
    <>
      <div
        ref={containerRef}
        className="flex w-fit items-center justify-center gap-2"
      >
        {editing && !loading ? (
          <Input
            type="text"
            value={title} // The current title value.
            ref={inputRef} // Reference for the input field.
            placeholder="Enter title"
            onChange={(e) => updateTitle(e.target.value)} // Update the title in storage as the user types.
            onKeyDown={updateTitleHandler} // Trigger title update when Enter is pressed.
            disabled={!editing} // Disable the input when not editing.
            className="document-title-input" // Apply custom styling.
          />
        ) : (
          <p className="document-title">{title}</p> // Display the current title when not editing.
        )}

        {/* Show edit icon if the current user is an editor and not currently editing */}
        {currentUserType === 'editor' && !editing && (
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={24}
            height={24}
            onClick={() => setEditing(true)} // Switch to edit mode when clicked.
            className="pointer"
          />
        )}

        {/* Display a "View only" message if the user is not an editor and not editing */}
        {currentUserType !== 'editor' && !editing && (
          <p className="view-only-tag">View only</p>
        )}

        {/* Show a loading message when the title is being saved */}
        {loading && <p className="text-sm text-gray-400">saving...</p>}
      </div>
    </>
  );
};

export default Title;
