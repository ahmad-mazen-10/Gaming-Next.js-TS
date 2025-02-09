'use client'
import React from 'react'
import ButtonSvg from '../ButtonSvg';
import Link from 'next/link';
import Spinner from './Spinner';

function ButtonGame({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className, onClick, link, text, icon, disabled = false,
}: {
    className?: string, onClick?: () => void, link?: string, text: string; icon?: React.ReactElement, disabled?: boolean;
}) {
    return (
        <button
            onClick={() => onClick && onClick()}
            disabled
            className={`${className || ""} hover:text-rose-400 duration-150 min-w-[100px] relative px-6 flex-initial gap-2 py-2 text-center m-auto`}>
            {ButtonSvg(false)}
            <span className='relative'> {disabled ? <Spinner /> : link ? <Link href={link}>{text}</Link> : text} </span>
            {icon && icon}
        </button>
    )
}

export default ButtonGame