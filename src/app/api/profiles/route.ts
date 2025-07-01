import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/lib/config-db";
import Profile from '@/lib/models/Profile';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        if (username) {
            // If a username is provided, return that profile only
            const profile = await Profile.findOne({ username });
            if (!profile) {
                return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
            }
            return NextResponse.json({ profile }, { status: 200 });
        } else {
            // If no username, return all profiles (for /u page)
            const profiles = await Profile.find({});
            return NextResponse.json({ profiles }, { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching user profile(s):', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
