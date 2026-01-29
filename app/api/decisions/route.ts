import { NextResponse } from 'next/server';
import { getPendingDecisions, updateDecisionStatus } from '@/app/lib/supabase';

export async function GET() {
  try {
    const decisions = await getPendingDecisions();
    return NextResponse.json(decisions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      );
    }

    const decision = await updateDecisionStatus(id, status);
    return NextResponse.json(decision);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
