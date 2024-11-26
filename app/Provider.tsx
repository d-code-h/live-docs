'use client';

import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from '@liveblocks/react/suspense';
import { ReactNode } from 'react';
import axios from 'axios';

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const { data: users } = await axios.get('/api/clerk-users', {
          params: {
            userIds: JSON.stringify(userIds),
          },
        });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const { data: roomUsers } = await axios.get('/api/room-users', {
          params: {
            room: JSON.stringify({
              roomId,
              currentUser: clerkUser?.emailAddresses[0].emailAddress as string,
              text,
            }),
          },
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
