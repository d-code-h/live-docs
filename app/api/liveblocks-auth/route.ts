import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function POST() {
  // Get the current user from your database
  const clerkUser = await currentUser();

  if (!clerkUser) redirect('/sign-in');

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Identify the user and return the result
  const { body, status } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  // user.id,
  // { userInfo: user.metadata } // Optional

  // Set permissions for this session
  // session.allow(`room:${id}:*`, session.READ_ACCESS); // Read access to all rooms owned by the user
  // session.allow(`room:${id}:my-room`, session.FULL_ACCESS); // Full access to a specific room
  // session.allow(`room:${roomId}`, session.FULL_ACCESS);

  // Authorize the user and return the result
  // const { status, body } = await session.authorize();
  return new Response(body, { status });
}
