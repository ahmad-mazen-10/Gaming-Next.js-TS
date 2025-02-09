'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperType from 'swiper';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';

function SwiperCards({
    items,
    paginationImages,
    className,
    slidesPerView,
}: {
    items: { card: ReactElement, src?: string }[],
    paginationImages?: boolean,
    className?: string,
    slidesPerView?: number
}) {

    const [swiper, setSwiper] = useState<SwiperType | null>();
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7))
        }, 110);
        return () => clearInterval(timer)
    }, [progress])

    useEffect(() => {
        swiper?.on('slideChange', () => setProgress(0))
    }, [swiper])


    return (
        <div className="flex flex-col gape-4">
            <Swiper
                autoplay={{ delay: 3000 }}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={slidesPerView || 1}
                className={`w-full ${className || "h-96"}`}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => setSwiper(swiper)}
            >
                {items.map(({ card }, i) => (
                    <SwiperSlide key={i}>
                        {card}
                    </SwiperSlide>
                ))}

            </Swiper>
            <div className="flex items-center gap-4">
                {paginationImages && items.map(({ src }, i) => (
                    <div key={i} onClick={() => {
                        swiper?.slideTo(i);
                        swiper?.autoplay.stop();
                    }}
                        className={`${swiper?.realIndex === i && "opacity-90 duration-200 md:shadow border-rose-500 -translate-y-5"} cursor-pointer hover:-translate-y-5 z-10 hover:shadow-md hover:opacity-90 duration-200 rounded-xl overflow-hidden max-w-lg w-full h-40 relative`}>


                        {swiper?.realIndex === i && swiper?.autoplay.running && (
                            <div style={{ width: `${progress}%` }} className='absolute w-0 opacity-50 inset-0 bg-gray-600 z-10'></div>
                        )}

                        <div>
                            {src && src !== "" ? <Image alt="Image-pagination" src={src} fill className="object-cover" /> : null}{" "}
                        </div>

                    </div>
                ))}
            </div>
        </div >
    )
}

export default SwiperCards