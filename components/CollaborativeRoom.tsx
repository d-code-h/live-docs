'use client'; // Indicating this component should be rendered on the client side in Next.js

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'; // Importing Liveblocks' ClientSideSuspense and RoomProvider for real-time collaborative features
import Header from './Header'; // Importing the Header component for displaying the page's header
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'; // Importing Clerk authentication components for user session management
import { Editor } from './editor/Editor'; // Importing the Editor component for collaborative editing
import ActiveCollaborators from './ActiveCollaborators'; // Importing the component that shows active collaborators
import Loader from './Loader'; // Importing a loading spinner or placeholder while content is being fetched
import ShareModal from './ShareModal'; // Importing a modal for sharing the room/document
import { LiveObject } from '@liveblocks/client'; // Importing Liveblocks' LiveObject to manage collaborative data in real time
import Title from './Title'; // Importing the Title component for displaying the document title

// The CollaborativeRoom component handles the collaborative room's layout and real-time interactions
const CollaborativeRoom = ({
  roomId, // The unique ID of the room (or document)
  roomMetadata, // Metadata for the room (e.g., title, creator)
  users, // List of users currently in the room
  currentUserType, // The current user's role or access level in the room
}: CollaborativeRoomProps) => {
  return (
    // RoomProvider is responsible for setting up the live room context, including shared state like the title
    <RoomProvider
      id={roomId} // The unique ID for the room
      initialStorage={{
        room: new LiveObject({
          title: roomMetadata.title, // Initial room title from metadata
        }),
      }}
    >
      {/* ClientSideSuspense ensures the component is only rendered after the data has been fetched */}
      <ClientSideSuspense fallback={<Loader />}> 
        <div className="collaborative-room">
          {/* Header section that contains the title and user interaction buttons */}
          <Header>
            {/* Title component for showing the room's metadata */}
            <Title
              roomId={roomId}
              roomMetadata={roomMetadata}
              users={users}
              currentUserType={currentUserType}
            />

            {/* A flex container for the right-aligned user interface buttons */}
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              {/* ActiveCollaborators shows the list of users currently collaborating */}
              <ActiveCollaborators />

              {/* ShareModal allows the user to share the document/room */}
              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

              {/* SignedOut block to show the SignInButton if the user is not authenticated */}
              <SignedOut>
                <SignInButton /> {/* Button to trigger sign-in */}
              </SignedOut>

              {/* SignedIn block to show the UserButton if the user is authenticated */}
              <SignedIn>
                <UserButton /> {/* Button showing the current user's info and options */}
              </SignedIn>
            </div>
          </Header>

          {/* Editor component allows collaborative editing of the document */}
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom; // Exporting the CollaborativeRoom component
