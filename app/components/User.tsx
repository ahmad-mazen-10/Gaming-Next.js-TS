import React from "react";
import Image from "next/image";

const User = ({ user }: { user: { name: string; avatar: { secure_url: string } } }) => {
   
    const safeUser = {
        name: user?.name || 'unknown user',
        avatar: {
            secure_url: user?.avatar?.secure_url || "https://www.vecteezy.com/free-vector/man-avatar",
        }
   }
   
    return (
        <div className=" cursor-pointer flex items-center gap-3">
            <div className=" w-14 h-14 relative rounded-full overflow-hidden">
                <Image fill src={safeUser.avatar.secure_url} alt={`${safeUser.name}`} className=" object-cover" />
            </div>
            <h1 className=" text-base text-white">{safeUser.name}</h1>
        </div>
    );
};

export default User;