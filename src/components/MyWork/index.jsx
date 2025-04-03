import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import ContactButton from '../ContactButton'

function MyWork() {
  const images = [
    { url: "../../../public/images_services/image-1.jpeg" },
    { url: "../../../public/images_services/image-2.jpeg" },
    { url: "../../../public/images_services/image-3.jpeg" },
    { url: "../../../public/images_services/image-4.jpeg" },
    { url: "../../../public/images_services/image-5.jpeg" },
    { url: "../../../public/images_services/image-6.jpeg" },
    { url: "../../../public/images_services/image-7.jpeg" },
    { url: "../../../public/images_services/image-8.jpeg" },
    { url: "../../../public/images_services/image-9.jpeg" },
    { url: "../../../public/images_services/image-10.jpeg" }
  ];

  return (
    <>
    <h2 className="text-2xl pt-14 py-2 text-white text-center bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">Alguns serviços já prestados</h2>
    <div className="flex overflow-hidden justify-center items-center pt-2 pb-20 bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[300px] h-[300px]"
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
    contact="https://wa.me/+5561981323772"
    text="Solicitar Orçamento"
    />
    </>
  );
}

export default MyWork;