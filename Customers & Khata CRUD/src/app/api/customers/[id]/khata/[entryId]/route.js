import { NextResponse } from 'next/server';
import store from '../../../../../../lib/db-store';
import { khataEntryUpdateSchema } from '../../../../../../lib/validations/khataSchema';
import { validateRequestBody } from '../../../../../../lib/validations/validate';

// PUT /api/customers/[id]/khata/[entryId] - Update a ledger transaction
export async function PUT(req, { params }) {
  try {
    const { id, entryId } = params;
    const customer = await store.getCustomerById(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    const validation = await validateRequestBody(khataEntryUpdateSchema, req);
    if (!validation.success) {
      return validation.response;
    }

    const validatedData = validation.data;
    const updatedEntry = await store.updateKhataEntry(id, entryId, validatedData);

    if (!updatedEntry) {
      return NextResponse.json(
        { success: false, message: 'Transaction entry not found' },
        { status: 404 }
      );
    }

    const updatedCustomer = await store.getCustomerById(id);

    return NextResponse.json({
      success: true,
      message: 'Transaction updated successfully',
      data: updatedEntry,
      customer: updatedCustomer
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating transaction', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[id]/khata/[entryId] - Delete a ledger transaction
export async function DELETE(req, { params }) {
  try {
    const { id, entryId } = params;
    const customer = await store.getCustomerById(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    const deleted = await store.deleteKhataEntry(id, entryId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Transaction entry not found or already deleted' },
        { status: 404 }
      );
    }

    const updatedCustomer = await store.getCustomerById(id);

    return NextResponse.json({
      success: true,
      message: 'Transaction deleted and customer balance adjusted',
      customer: updatedCustomer
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting transaction', error: error.message },
      { status: 500 }
    );
  }
}
