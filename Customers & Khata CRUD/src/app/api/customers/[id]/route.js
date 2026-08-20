import { NextResponse } from 'next/server';
import store from '../../../../lib/db-store';
import { customerUpdateSchema } from '../../../../lib/validations/customerSchema';
import { validateRequestBody } from '../../../../lib/validations/validate';

// GET /api/customers/[id] - Fetch single customer with stats
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const customer = await store.getCustomerById(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    const entries = await store.getKhataEntriesByCustomer(id);

    return NextResponse.json({
      success: true,
      data: {
        ...customer,
        transactionsCount: entries.length,
        recentTransactions: entries.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving customer', error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/customers/[id] - Update customer with Zod validation
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const existing = await store.getCustomerById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    const validation = await validateRequestBody(customerUpdateSchema, req);
    if (!validation.success) {
      return validation.response;
    }

    const validatedData = validation.data;

    // Check duplicate phone if phone is being updated
    if (validatedData.phone && validatedData.phone !== existing.phone) {
      const duplicate = await store.findCustomerByPhone(validatedData.phone, id);
      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            message: 'Phone number already registered with another customer',
            errors: { phone: 'This mobile number is already in use by ' + duplicate.name }
          },
          { status: 409 }
        );
      }
    }

    const updated = await store.updateCustomer(id, validatedData);

    return NextResponse.json({
      success: true,
      message: 'Customer profile updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating customer', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[id] - Delete customer and cascade delete khata entries
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const customer = await store.getCustomerById(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    const deleted = await store.deleteCustomer(id);

    return NextResponse.json({
      success: true,
      message: `Customer "${customer.name}" and all ledger records deleted successfully`,
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting customer', error: error.message },
      { status: 500 }
    );
  }
}
