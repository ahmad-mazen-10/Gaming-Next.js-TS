'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    link: string;
    label: string;
    icon: React.ReactElement;
}


function NavLink({ link, label, icon }: NavLinkProps) {

    const pathName = usePathname();
    const isActive = pathName === link;

    return (
        <Link href={link} className={`flex ${isActive ? 'hover:text-rose-400 my-2' : 'text-gray-50'} duration-200 gap-2 p-2 hover:bg-gray-100 rounded`}>
            {React.cloneElement(icon, { className: "w-5 h-6" })}
            <span>{label}</span>
        </Link>
    );
}

export default NavLink;