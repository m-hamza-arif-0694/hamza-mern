import { NextResponse } from 'next/server';
import store from '../../../../lib/db-store';

// GET /api/customers/stats - Dashboard summary metrics
export async function GET() {
  try {
    const stats = await store.getOverallStats();
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve stats', error: error.message },
      { status: 500 }
    );
  }
}
