import { NextResponse } from 'next/server';
import { getBusinesses } from '@/app/lib/supabase';

export async function GET() {
  try {
    const businesses = await getBusinesses();
    return NextResponse.json(businesses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
