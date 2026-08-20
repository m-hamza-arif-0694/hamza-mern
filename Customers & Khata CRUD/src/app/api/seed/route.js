import { NextResponse } from 'next/server';
import store from '../../../lib/db-store';

// POST /api/seed - Reset and seed database with sample Pakistani merchant records
export async function POST() {
  try {
    const result = await store.resetToSeedData();
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with Pakistani customer and khata records',
      details: result
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to seed database', error: error.message },
      { status: 500 }
    );
  }
}
