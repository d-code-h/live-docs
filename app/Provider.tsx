'use client';

import Loader from '@/components/Loader'; // Importing a Loader component for displaying a loading state
import { useUser } from '@clerk/nextjs'; // Importing the hook to retrieve the current user from Clerk
import {
  ClientSideSuspense, // Importing ClientSideSuspense to manage client-side suspense behavior
  LiveblocksProvider, // Importing LiveblocksProvider to manage real-time collaboration via Liveblocks
} from '@liveblocks/react/suspense'; // Liveblocks integration for collaboration and real-time data syncing
import { ReactNode } from 'react'; // Importing ReactNode to define children prop type
import axios from 'axios'; // Importing axios for making HTTP requests

// Provider component to wrap around the app and set up the Liveblocks context
const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser(); // Using Clerk's useUser hook to get the current user information

  return (
    // LiveblocksProvider manages the Liveblocks session and provides necessary configuration
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth" // The authentication endpoint for Liveblocks
      resolveUsers={async ({ userIds }) => {
        // Resolves users based on the provided user IDs
        const { data: users } = await axios.get('/api/clerk-users', {
          params: {
            userIds: JSON.stringify(userIds), // Sending user IDs to the backend to retrieve user details
          },
        });

        return users; // Returns the fetched users
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        // Resolves mention suggestions for user input in a specific room
        const { data: roomUsers } = await axios.get('/api/room-users', {
          params: {
            room: JSON.stringify({
              roomId, // The room ID for the specific collaborative session
              currentUser: clerkUser?.emailAddresses[0].emailAddress as string, // Current user's email address from Clerk
              text, // The text input to resolve mentions
            }),
          },
        });

        return roomUsers; // Returns the users in the room based on the provided text
      }}
    >
      {/* ClientSideSuspense wraps the children components and displays a Loader until the content is ready */}
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
