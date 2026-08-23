import { loginSchema } from '../../../../lib/validations/auth';
import { signToken } from '../../../../lib/auth';
import { successResponse, errorResponse, validateBody } from '../../../../lib/api';

export async function POST(request: Request) {
  try {
    const { data, error } = await validateBody(request, loginSchema);

    if (error) {
      return errorResponse('Validation failed', 400, error);
    }

    const { email } = data;

    // TODO: Connect database check
    const mockUser = { id: 'usr_123', name: 'Test User', email };
    const token = signToken({ id: mockUser.id, email: mockUser.email });

    const response = successResponse({ message: 'Logged in successfully', user: mockUser });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return errorResponse('Internal server error', 500);
  }
}