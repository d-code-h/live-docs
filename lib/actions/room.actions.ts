'use server';

import { nanoid } from 'nanoid'; // Importing nanoid for generating unique IDs
import { liveblocks } from '../liveblocks'; // Importing Liveblocks for real-time collaboration features
import { revalidatePath } from 'next/cache'; // Revalidating paths for Next.js caching
import { getAccessType, parseStringify } from '../utils'; // Utility functions for access type and data manipulation
import { redirect } from 'next/navigation'; // For redirecting the user after actions

// Creates a new document (room) with specified userId and email
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid(); // Generating a unique room ID for the new document

  try {
    // Defining metadata for the new room/document
    const metadata = {
      creatorId: userId, // Setting the creator's user ID
      email, // Setting the creator's email
      title: 'Untitled', // Default title for the document
    };

    // Defining access rights for the creator (write access to the room)
    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'], // Creator gets write access
    };

    // Creating the new room (document) in Liveblocks
    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write'], // Default access rights for the room
    });

    revalidatePath('/'); // Revalidating the home path to reflect changes
    return parseStringify(room); // Returning the room object, deeply cloned
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`); // Logging errors if any
  }
};

// Updates the title of an existing document (room)
export const updateDocument = async (roomId: string, title: string) => {
  try {
    // Updating the room's metadata (title)
    const updateRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title, // New title for the document
      },
    });

    revalidatePath(`/documents/${roomId}`); // Revalidating the document's path to reflect updates
    return parseStringify(updateRoom); // Returning the updated room object, deeply cloned
  } catch (error) {
    console.log(`Error happening while updating a room: ${error}`); // Logging errors if any
  }
};

// Fetches the document (room) and checks if the user has access to it
export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    // Fetching the room from Liveblocks
    const room = await liveblocks.getRoom(roomId);

    // Checking if the user has access to the room
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error('You do not have access to this document'); // Throwing error if no access
    }

    return parseStringify(room); // Returning the room object, deeply cloned
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`); // Logging errors if any
  }
};

// Fetches all documents (rooms) accessible by the user with the provided email
export const getDocuments = async (email: string) => {
  try {
    // Fetching all rooms accessible by the user with the specified email
    const rooms = await liveblocks.getRooms({
      userId: email, // Filtering rooms by the user's email
    });

    return parseStringify(rooms); // Returning the list of rooms, deeply cloned
  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`); // Logging errors if any
  }
};

// Updates the access level of a specific user for a given document (room)
export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    // Determining the access type (read or write) based on userType
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType, // Setting the access for the user
    };

    // Updating the room with the new access levels
    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });

    if (room) {
      // If the room was updated successfully, trigger an inbox notification for the user
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email, // Sending notification to the user
        kind: '$documentAccess', // Document access notification
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email,
        },
        roomId,
      });
    }

    revalidatePath(`/documents/${roomId}`); // Revalidating the document's path
    return parseStringify(room); // Returning the updated room object, deeply cloned
  } catch (error) {
    console.log(`Error happened while updating a room access: ${error}`); // Logging errors if any
  }
};

// Removes a collaborator from a document (room)
export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    // Fetching the room to check if the current user is trying to remove themselves
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error('You cannot remove yourself from the document'); // Preventing the user from removing themselves
    }

    // Updating the room to remove the collaborator's access
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null, // Setting the user's access to null, effectively removing them
      },
    });

    revalidatePath(`/documents/${roomId}`); // Revalidating the document's path to reflect changes
    return parseStringify(updatedRoom); // Returning the updated room object, deeply cloned
  } catch (error) {
    console.log(`Error happened while removing a collaborator: ${error}`); // Logging errors if any
  }
};

// Deletes a document (room) completely
export const deleteDocument = async (roomId: string) => {
  try {
    // Deleting the room from Liveblocks
    await liveblocks.deleteRoom(roomId);

    revalidatePath('/'); // Revalidating the home path to reflect document deletion
    redirect('/'); // Redirecting the user to the home page after deletion
  } catch (error) {
    console.log(`Error happened while deleting a room: ${error}`); // Logging errors if any
  }
};
