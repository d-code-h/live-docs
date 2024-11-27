'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import Header from './Header';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Editor } from './editor/Editor';
import ActiveCollaborators from './ActiveCollaborators';
import Loader from './Loader';
import ShareModal from './ShareModal';
import { LiveObject } from '@liveblocks/client';
import Title from './Title';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialStorage={{
        room: new LiveObject({
          title: roomMetadata.title,
        }),
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <Title
              roomId={roomId}
              roomMetadata={roomMetadata}
              users={users}
              currentUserType={currentUserType}
            />

            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
