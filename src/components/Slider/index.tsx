import React from 'react'
import './Slider.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';

const Slider: React.FC = () => {

    const slides = [
        '/img/slider1.png',
        '/img/slider1.png',
        '/img/slider1.png',
        '/img/slider1.png',
        '/img/slider1.png',
        '/img/slider1.png',
        '/img/slider1.png',
    ]

    return (
        <Swiper
            className='slider'
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            navigation
            pagination={{ clickable: true }}
            speed={1000}
            autoplay = {{
              delay: 10000,
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <img src={slide} alt="Slide" />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider