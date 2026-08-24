import { NextResponse } from 'next/server';
import store from '../../../lib/db-store';
import { customerCreateSchema, customerQuerySchema } from '../../../lib/validations/customerSchema';
import { validateRequestBody } from '../../../lib/validations/validate';

// GET /api/customers - List customers with search, category, status, balanceType filters and stats
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      balanceType: searchParams.get('balanceType') || undefined,
      sortBy: searchParams.get('sortBy') || 'updatedAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 50
    };

    const queryValidation = customerQuerySchema.safeParse(rawQuery);
    const query = queryValidation.success ? queryValidation.data : rawQuery;

    const customers = await store.getCustomers(query);
    const stats = await store.getOverallStats();

    return NextResponse.json({
      success: true,
      count: customers.length,
      data: customers,
      stats
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve customers', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/customers - Register a new customer record with Zod validation
export async function POST(req) {
  try {
    const validation = await validateRequestBody(customerCreateSchema, req);
    if (!validation.success) {
      return validation.response;
    }

    const validatedData = validation.data;

    // Check duplicate phone number
    const existing = await store.findCustomerByPhone(validatedData.phone);
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Customer with this mobile number already exists',
          errors: { phone: 'This mobile number is already registered with ' + existing.name }
        },
        { status: 409 }
      );
    }

    const createdCustomer = await store.createCustomer(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Customer registered successfully',
        data: createdCustomer
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while creating customer', error: error.message },
      { status: 500 }
    );
  }
}
