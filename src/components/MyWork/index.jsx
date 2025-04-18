import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import ContactButton from '../ContactButton'

function MyWork() {
  const images = [
    { url: "/images_services/image-1.jpeg" },
    { url: "/images_services/image-2.jpeg" },
    { url: "/images_services/image-3.jpeg" },
    { url: "/images_services/image-4.jpeg" },
    { url: "/images_services/image-5.jpeg" },
    { url: "/images_services/image-6.jpeg" },
    { url: "/images_services/image-7.jpeg" },
    { url: "/images_services/image-8.jpeg" },
    { url: "/images_services/image-9.jpeg" },
    { url: "/images_services/image-10.jpeg" },
    { url: "/images_services/image-11.jpg" },
    { url: "/images_services/image-12.jpg" },
    { url: "/images_services/image-13.jpg" },
    { url: "/images_services/image-14.jpg" },
    { url: "/images_services/image-15.jpg" },
    { url: "/images_services/image-16.jpg" }
  ];

  return (
    <>
    <h2 className="text-2xl pt-14 pb-7 text-white text-center bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">Alguns serviços já prestados</h2>
    <div className="flex overflow-hidden justify-center items-center pt-2 pb-20 bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[320px] h-[320px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    < ContactButton
    contact="https://wa.me/+5561996654539"
    text="Solicitar Orçamento"
    />
    </>
  );
}

export default MyWork;