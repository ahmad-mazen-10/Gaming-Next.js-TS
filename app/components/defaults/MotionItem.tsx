/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface MotionItemProps {
    children: React.ReactNode;
    className?: string;
    initial?: any;
    animate?: any;
    whileInView?: any;
}

function MotionItem({ children, className, initial, animate, whileInView }: MotionItemProps) {
    return (
        <motion.div initial={initial} animate={whileInView} whileInView={animate} className={`${className || ''}`}>
            {children}
        </motion.div>
    )
}

export default MotionItem