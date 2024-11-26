import { getClerkUsers } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userIds = await JSON.parse(
    request.nextUrl.searchParams.get('userIds') as string
  );

  try {
    const sortedUsers = await getClerkUsers({ userIds });
    return NextResponse.json(sortedUsers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
