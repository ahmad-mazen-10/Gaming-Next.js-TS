import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface MaxWidthWrapperProps {
    customPadding?: string;
    className?: string;
    noPadding?: boolean;
    children?: ReactNode;
}

function MaxWidthWrapper({ customPadding, className, noPadding, children }: MaxWidthWrapperProps) {
    return (
        <section className={cn("max-w-[1375px] w-full px-10", className || "", { 'py-0': noPadding }, { 'py-8': !noPadding }, customPadding)}> {children}</section >
    )
}

export default MaxWidthWrapper