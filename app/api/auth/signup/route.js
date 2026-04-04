import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password, role, org, city, phone } = await request.json();

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine avatar based on role
    const avatarMap = {
      donor: '🍽️',
      ngo: '🏥',
      volunteer: '🚴',
      admin: '👨‍💼',
      beneficiary: '🤲',
      corporate: '🏢',
    };

    // Create user in PostgreSQL
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'donor',
        avatar: avatarMap[role] || '👤',
        org: org || 'Independent',
        city: city || 'Delhi',
        phone: phone || '',
        verified: false,
      },
    });

    // Return user without password
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
