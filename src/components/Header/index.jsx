import { useEffect } from "react";

function Header() {
  const images = [
    { url: "/banners/banner-2.jpeg" },
    { url: "/banners/banner-1.jpeg" }
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
      <section className="splide pt-20 h-full" aria-label="Splide Basic HTML Example">
        <div className="splide__track h-[370px]">
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