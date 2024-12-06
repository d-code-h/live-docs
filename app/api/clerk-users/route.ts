import { getClerkUsers } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Extract the 'userIds' query parameter from the URL and parse it
    const userIds = JSON.parse(
      request.nextUrl.searchParams.get('userIds') as string
    );

    // Fetch the sorted users using the getClerkUsers function
    const sortedUsers = await getClerkUsers({ userIds });

    // Return the sorted users in JSON format
    return NextResponse.json(sortedUsers);
  } catch (error) {
    // Log the error and return a 500 response if an error occurs
    console.error('Error fetching users:', error);

    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
