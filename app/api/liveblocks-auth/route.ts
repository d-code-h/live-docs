import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';

export async function POST() {
  try {
    // Fetch the current user from Clerk
    const clerkUser = await currentUser();

    // Check if user is authenticated
    if (!clerkUser) {
      return new Response('User not authenticated', { status: 401 });
    }

    // Destructure user data from Clerk response
    const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

    // Prepare the user object with necessary details
    const user = {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id), // Assuming getUserColor assigns a color based on the user id
    };

    // Identify the user with Liveblocks
    const { body, status } = await liveblocks.identifyUser(
      { userId: user.email, groupIds: [] }, // No groupIds provided here
      { userInfo: user } // Send the user information to Liveblocks
    );

    // Return the response from Liveblocks
    return new Response(body, { status });
  } catch (error) {
    // Log the error and return a 500 response if anything goes wrong
    console.error('Error in Liveblocks auth route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
