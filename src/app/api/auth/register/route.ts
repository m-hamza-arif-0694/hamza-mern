import { NextResponse } from 'next/server';
import { registerSchema } from '../../../../lib/validations/auth';
import { hashPassword, signToken } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // TODO: Check if user already exists in DB
    const hashedPassword = await hashPassword(password);

    // TODO: Create user record in DB
    const mockUser = { id: 'usr_123', name, email };
    const token = signToken({ id: mockUser.id, email: mockUser.email });

    const response = NextResponse.json(
      { message: 'User registered successfully', user: mockUser },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}