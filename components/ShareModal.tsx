'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useSelf } from '@liveblocks/react/suspense';
import React, { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { Label } from './ui/label';
import { Input } from './ui/input';
import UserTypeSelector from './UserTypeSelector';
import Collaborator from './Collaborator';
import { updateDocumentAccess } from '@/lib/actions/room.actions';

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  // Hook to get current user information (from Liveblocks)
  const user = useSelf();

  // State for controlling modal visibility
  const [open, setOpen] = useState(false);

  // State for handling loading state while sharing document
  const [loading, setLoading] = useState(false);

  // State for email input field
  const [email, setEmail] = useState('');

  // State for managing selected user type (viewer/editor)
  const [userType, setUserType] = useState<UserType>('viewer');

  // Function to handle sharing document access (email and user type)
  const shareDocumentHandler = async () => {
    setLoading(true); // Set loading state to true when the operation starts

    // Call the updateDocumentAccess action to update the room's access
    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info,
    });

    setLoading(false); // Set loading state to false after the operation is complete
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button to open the dialog */}
      <DialogTrigger asChild>
        <Button
          className="gradient-blue flex h-9 gap-1 px-4"
          disabled={currentUserType !== 'editor'} // Only editors can share
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>

        {/* Input for email address */}
        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          {/* Input field for email and user type selector */}
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="share-input"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>

          {/* Button to send the invitation */}
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Sending...' : 'Invite'}{' '}
            {/* Display loading text when in progress */}
          </Button>
        </div>

        {/* Display list of current collaborators */}
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info} // Pass current user info to Collaborator component
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
