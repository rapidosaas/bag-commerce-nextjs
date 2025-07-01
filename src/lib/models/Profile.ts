import mongoose, { Schema, models } from "mongoose";

const profileSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: false, // LinkedIn is optional,
        },
        bio: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Profile = models?.Profile || mongoose.model("Profile", profileSchema);
export default Profile;