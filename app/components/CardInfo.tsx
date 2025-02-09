import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import MotionItem from './defaults/MotionItem';
import { CardInfoProps } from '../(grid)/@types';



function CardInfo({ desc, title, image, textBtn, btnClasses }: CardInfoProps) {
  return (
    <MotionItem initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, duration: 1 }} className='flex flex-col items-start absolute left-20 top-20 max-w-md'>

      <div className="w-96 h-40 relative">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <p className="text-gray-200 text-base">{desc}</p>

      <Button className={`rounded-full text-gray-50 mt-5 ${btnClasses || ""}`}>{textBtn || "find out more !"}</Button>
    </MotionItem>
  )
}

export default CardInfo