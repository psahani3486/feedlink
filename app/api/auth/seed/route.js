import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

// Demo accounts to seed into the database
const SEED_USERS = [
  { email: 'donor@feedlink.in', password: 'password', name: 'Raj Sharma', role: 'donor', avatar: '🍽️', org: 'Taj Palace Kitchen', city: 'Delhi', phone: '+91 98100 11111', verified: true },
  { email: 'ngo@feedlink.in', password: 'password', name: 'Priya Singh', role: 'ngo', avatar: '🏥', org: 'Akshaya Patra Foundation', city: 'Bangalore', phone: '+91 98808 22222', verified: true },
  { email: 'volunteer@feedlink.in', password: 'password', name: 'Arjun Patel', role: 'volunteer', avatar: '🚴', org: 'Independent', city: 'Mumbai', phone: '+91 98200 33333', verified: true },
  { email: 'admin@feedlink.in', password: 'admin123', name: 'Admin User', role: 'admin', avatar: '👨‍💼', org: 'FeedLink HQ', city: 'Delhi', phone: '+91 98100 00000', verified: true },
];

export async function POST() {
  try {
    const results = [];

    for (const userData of SEED_USERS) {
      // Skip if user already exists
      const existing = await prisma.user.findUnique({ where: { email: userData.email } });
      if (existing) {
        results.push({ email: userData.email, status: 'already exists' });
        continue;
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      results.push({ email: userData.email, status: 'created' });
    }

    return NextResponse.json({ success: true, message: 'Demo users seeded', results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: 'Seeding failed' }, { status: 500 });
  }
}
