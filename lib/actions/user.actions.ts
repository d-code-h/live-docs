'use server';

import { clerkClient } from '@clerk/nextjs/server'; // Importing Clerk client for user management
import { parseStringify } from '../utils'; // Utility function for deep cloning data
import { liveblocks } from '../liveblocks'; // Importing Liveblocks for real-time collaboration features

// Fetches Clerk users based on provided user IDs
export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    // Fetching user details from Clerk using the provided user IDs
    const { data } = await (
      await clerkClient()
    ).users.getUserList({
      emailAddress: userIds, // Using the user IDs to filter the user list
    });

    // Mapping the user data to only include necessary fields (id, name, email, avatar)
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    // Sorting the users to match the order of userIds passed as input
    const sortedUsers = userIds.map(
      (email) => users.find((user) => user.email === email) // Find each user by email and return it in the correct order
    );

    // Returning the sorted list of users, using parseStringify to deep clone the data
    return parseStringify(sortedUsers);
  } catch (error) {
    // Logging any errors encountered during the user fetching process
    console.log(error);
  }
};

// Fetches document users based on the room ID, current user, and search text
export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    // Fetching the room object from Liveblocks
    const room = await liveblocks.getRoom(roomId);

    // Filtering out the current user from the list of users in the room
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    // If there is text provided, filter the users based on whether their email contains the text
    if (text.length) {
      const lowerCaseText = text.toLowerCase(); // Convert the text to lowercase for case-insensitive comparison

      // Filtering users whose email contains the search text
      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );

      // Returning the filtered list of users, deep-cloned
      return parseStringify(filteredUsers);
    }
  } catch (error) {
    // Logging any errors encountered during the document users fetching process
    console.log(`Error fetching document users: ${error}`);
  }
};
