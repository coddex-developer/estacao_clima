import { useEffect } from "react";
import "./header.min.css";

function Header() {
  const images = [
    { url: "/banners/bg-03.png" },
    { url: "/banners/bg-02.png" },
    { url: "/banners/bg-01.png" }
  ];

  useEffect(() => {
    if (window.Splide) {
      const splide = new window.Splide(".splide", {
        type: "loop",
        perPage: 1,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        arrows: true,
        pagination: true,
        speed: 1000,
      });

      splide.mount();

      return () => {
        splide.destroy();
      };
    }
  }, []);

  return (
    <>
      <section className="splide bg-gray-800 box_slide" aria-label="Splide Basic HTML Example">
        <div className="splide__track card_slide">
          <ul className="splide__list">
            {images.map((img, index) => (
              <li key={index} className="splide__slide">
                <img className="h-full w-full" src={img.url} alt={`slide-image-${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      
    </>
  );
}

export default Header;