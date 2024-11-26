import { getDocumentUsers } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { roomId, currentUser, text } = await JSON.parse(
    request.nextUrl.searchParams.get('room') as string
  );

  try {
    const roomUsers = await getDocumentUsers({ roomId, currentUser, text });

    return NextResponse.json(roomUsers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
