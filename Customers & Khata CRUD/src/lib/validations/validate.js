import { NextResponse } from 'next/server';

/**
 * Validates request data against a Zod schema.
 * Returns { success: true, data } or { success: false, response: NextResponse }
 */
export async function validateRequestBody(schema, req) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path.join('.') || 'general';
        if (!formattedErrors[field]) {
          formattedErrors[field] = err.message;
        }
      });

      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            message: 'Validation failed',
            errors: formattedErrors,
            details: result.error.errors
          },
          { status: 400 }
        )
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON request payload',
          error: error.message
        },
        { status: 400 }
      )
    };
  }
}

/**
 * Validates plain object against a Zod schema
 */
export function validateData(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const formattedErrors = {};
    result.error.errors.forEach((err) => {
      const field = err.path.join('.') || 'general';
      if (!formattedErrors[field]) {
        formattedErrors[field] = err.message;
      }
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data };
}
