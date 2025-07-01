import { connectDB } from "@/lib/config-db";
import Profile from "@/lib/models/Profile";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        console.log("Request : " + request.json);
        
        const body = await request.json();
        const { username, userId } = body;
        console.log("username : " + username);
    
        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }
    
        const user = await Profile.findOne({ username });
        console.log("user : " + user);
        console.log("userId : " + userId);

        if (user) {
            const id = new ObjectId(userId);
            console.log("id : " + id);

            if (user.userId.equals(id)) {
                // Username is taken but belongs to the same user
                return NextResponse.json({ isAvailable: true }, { status: 200 });
            } else {
                // Username is taken by another user
                return NextResponse.json({ isAvailable: false }, { status: 200 });
            }
        } else {
            // Username is available
            return NextResponse.json({ isAvailable: true }, { status: 200 });
        }

      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
      }
}