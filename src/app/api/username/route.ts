import { connectDB } from "@/lib/config-db";
import Profile from "@/lib/models/Profile";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
    await connectDB();
    const body = await request.json();
    console.log(body);
    const profile = await Profile.findOne({ ...body });
    console.log(profile);
    if (!profile) {
      return NextResponse.json({ username: null }, { status: 200 });
    }
    return NextResponse.json({ username: profile.username }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }