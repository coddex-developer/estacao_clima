import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import ContactButton from '../ContactButton'

function MyWork() {
  const images = [
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8SZ_WJraRVMFXlhzoTK2HNAVCO5iqHtiWtt1tUzD9fr2n0HxYwpkpM51&s=10" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8SZ_WJraRVMFXlhzoTK2HNAVCO5iqHtiWtt1tUzD9fr2n0HxYwpkpM51&s=10" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8SZ_WJraRVMFXlhzoTK2HNAVCO5iqHtiWtt1tUzD9fr2n0HxYwpkpM51&s=10" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8SZ_WJraRVMFXlhzoTK2HNAVCO5iqHtiWtt1tUzD9fr2n0HxYwpkpM51&s=10" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8SZ_WJraRVMFXlhzoTK2HNAVCO5iqHtiWtt1tUzD9fr2n0HxYwpkpM51&s=10" },
  ];

  return (
    <>
    <h2 className="text-2xl pt-14 py-2 text-center bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">Alguns serviços já prestados</h2>
    <div className="flex overflow-hidden justify-center items-center py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
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