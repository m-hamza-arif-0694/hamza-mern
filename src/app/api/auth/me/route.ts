import { cookies } from 'next/headers';
import { verifyToken } from '../../../../lib/auth';
import { successResponse, errorResponse } from '../../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return errorResponse('Unauthorized', 401);
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse('Invalid or expired token', 401);
    }

    return successResponse({ user: decoded });
  } catch (err) {
    console.error('Get profile error:', err);
    return errorResponse('Internal server error', 500);
  }
}