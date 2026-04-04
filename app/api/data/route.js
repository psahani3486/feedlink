import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const [donors, ngos, volunteers, donations, notifications, fridges, beneficiaries, sponsors, disasters, camps] = await Promise.all([
      prisma.donor.findMany(),
      prisma.ngo.findMany(),
      prisma.volunteer.findMany({ orderBy: { points: 'desc' } }),
      prisma.donation.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.notification.findMany({ orderBy: { id: 'desc' } }),
      prisma.communityFridge.findMany(),
      prisma.beneficiaryProfile.findMany(),
      prisma.corporateSponsor.findMany({ orderBy: { mealsSponsored: 'desc' } }),
      prisma.disasterEvent.findMany(),
      prisma.emergencyCamp.findMany(),
    ]);

    // Parse volunteer badges from JSON string back to array
    const volunteersWithBadges = volunteers.map(v => ({
      ...v,
      badges: JSON.parse(v.badges || '[]'),
    }));

    // Reconstruct emergency camps with nested supplies object for frontend compatibility
    const campsWithSupplies = camps.map(c => ({
      ...c,
      supplies: { water: c.supplyWater, food: c.supplyFood, medical: c.supplyMedical },
    }));

    return NextResponse.json({
      success: true,
      data: {
        donors,
        ngos,
        volunteers: volunteersWithBadges,
        donations,
        notifications,
        fridges,
        beneficiaries,
        sponsors,
        disasters,
        camps: campsWithSupplies,
      },
    });
  } catch (error) {
    console.error('Data fetch error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
