import { NextResponse } from 'next/server';
import store from '../../../../../lib/db-store';
import { khataEntryCreateSchema } from '../../../../../lib/validations/khataSchema';
import { validateRequestBody } from '../../../../../lib/validations/validate';

// GET /api/customers/[id]/khata - Get all khata ledger entries with running balance
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

    // Calculate totals
    let totalCredit = 0; // You Gave
    let totalDebit = 0;  // You Got

    entries.forEach((e) => {
      if (e.type === 'GAVE_CREDIT') totalCredit += e.amount;
      else totalDebit += e.amount;
    });

    return NextResponse.json({
      success: true,
      customer: {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        category: customer.category,
        creditLimit: customer.creditLimit,
        netBalance: customer.netBalance
      },
      summary: {
        totalGave: totalCredit,
        totalGot: totalDebit,
        netBalance: customer.netBalance,
        entriesCount: entries.length
      },
      data: entries
    });
  } catch (error) {
    console.error('Error fetching khata entries:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving khata ledger entries', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/customers/[id]/khata - Add a new Credit (You Gave) or Debit (You Got) entry
export async function POST(req, { params }) {
  try {
    const { id } = params;
    const customer = await store.getCustomerById(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    const validation = await validateRequestBody(khataEntryCreateSchema, req);
    if (!validation.success) {
      return validation.response;
    }

    const validatedData = validation.data;
    const createdEntry = await store.addKhataEntry(id, validatedData);
    const updatedCustomer = await store.getCustomerById(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Khata ledger transaction saved successfully',
        data: createdEntry,
        customer: updatedCustomer
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording khata entry:', error);
    return NextResponse.json(
      { success: false, message: 'Error recording khata entry', error: error.message },
      { status: 500 }
    );
  }
}
