import { SwiperOptions } from "swiper";

// import Swiper core and required components
import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

export type SwiperConfig = {
    slidesPerView: 2,
    spaceBetween: 20,
    Autoplay: true,
    // loop: true,
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: true
    },
    // pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        1024: {
            slidesPerView: 8,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 6,
            spaceBetween: 10
        },
        640: {
            slidesPerView: 4,
            spaceBetween: 10
        },
        320: {
            slidesPerView: 3,
            spaceBetween: 10
        }
    },
}