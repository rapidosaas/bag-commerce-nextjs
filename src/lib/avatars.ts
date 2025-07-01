import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";

export const randomImages = [
  { name: avatar1, source: "avatar-1.png" },
  { name: avatar2, source: "avatar-2.png" },
  { name: avatar3, source: "avatar-3.png" },
];

export const getAvatarSource = (avatar: string | null) => {
    console.log('Avatar:', avatar);
    const avatarObj = randomImages.find((img) => img.source === avatar);
    console.log('Avatar:', avatarObj);
    return avatarObj ? avatarObj.name.src : avatar1.src;
};