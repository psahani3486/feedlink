import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const donation = await prisma.donation.create({ data: body });
    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error) {
    console.error('Donation create error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, ...updates } = await request.json();
    const donation = await prisma.donation.update({ where: { id }, data: updates });
    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Donation update error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
