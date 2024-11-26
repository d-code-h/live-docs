import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';

export async function POST() {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return new Response('User not authenticated', { status: 401 });
    }

    const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

    const user = {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    };

    // Identify the user with Liveblocks
    const { body, status } = await liveblocks.identifyUser(
      { userId: user.email, groupIds: [] },
      { userInfo: user }
    );

    return new Response(body, { status });
  } catch (error) {
    console.error('Error in Liveblocks auth route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
