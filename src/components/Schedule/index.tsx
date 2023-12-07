import React from "react";
import "./Schedule.scss";
import ScheduleCard from "../ScheduleCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import { useMediaQuery } from "react-responsive";

const Schedule: React.FC = () => {
    const isMediumDisplay = useMediaQuery({ maxWidth: 990, minWidth: 781 });
    const isSmallDisplay = useMediaQuery({ maxWidth: 470 });
    const isLargeDisplay = useMediaQuery({ minWidth: 991 });

    return (
        <div className="schedule">
            <Swiper
                modules={[Navigation, A11y, Autoplay]}
                spaceBetween={32}
                slidesPerView={
                    isLargeDisplay
                        ? 4
                        : isMediumDisplay
                        ? 3
                        : isSmallDisplay
                        ? 1
                        : 2
                }
                // slidesPerView={4}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                navigation
                speed={1000}
                autoplay={{
                    delay: 7000,
                }}
            >
                <SwiperSlide>
                    {" "}
                    <ScheduleCard />{" "}
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <ScheduleCard />{" "}
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <ScheduleCard />{" "}
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <ScheduleCard />{" "}
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <ScheduleCard />{" "}
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <ScheduleCard />{" "}
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Schedule;
