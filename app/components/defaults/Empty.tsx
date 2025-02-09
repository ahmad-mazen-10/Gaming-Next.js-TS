import React from 'react'
import Link from "next/link";

function Empty({ message, link, linkText }: { message?: string, link?: string, linkText?: string }) {
    return (
        <div className=" flex gap-4 items-center justify-center col-span-full w-full min-h-[40vh] flex-col">
            <p className=" text-gray-50 font-semibold text-3xl">{message || "Sorry, no games found in this page"}</p>
            {link && (
                <Link href={link} className=" text-xl text-rose-500 hover:underline hover:text-rose-400 duration-150">
                    {linkText || "Browse More Games"}
                </Link>
            )}
        </div>
    )
}

export default Empty