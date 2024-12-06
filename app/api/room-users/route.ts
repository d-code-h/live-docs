import { getDocumentUsers } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Extracting parameters from the URL
  const { roomId, currentUser, text } = JSON.parse(
    request.nextUrl.searchParams.get('room') as string
  );

  try {
    // Fetching the users associated with the document
    const roomUsers = await getDocumentUsers({ roomId, currentUser, text });

    // Returning the list of users as a JSON response
    return NextResponse.json(roomUsers);
  } catch (error) {
    console.error(error); // Logging the error for debugging
    // Returning an error response with status 500
    return NextResponse.json({
      status: 500,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
}
