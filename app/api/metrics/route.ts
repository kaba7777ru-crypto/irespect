import { NextResponse } from 'next/server';
import { getMetrics } from '@/app/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId') || undefined;
    const days = parseInt(searchParams.get('days') || '7');

    const metrics = await getMetrics(businessId, days);
    return NextResponse.json(metrics);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
