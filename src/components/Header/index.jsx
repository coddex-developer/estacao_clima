import { useEffect } from "react";

function Header() {
  const images = [
    { url: "https://imgs.search.brave.com/PA34zg-ZDgXOLUfOV8rI6m9CrCNSCd--5lFRHOKmR8M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2Nvbmp1bnRvLWRl/LWZlcnJhbWVudGFz/LWVtLXVtLWtpdC1k/ZS1mZXJyYW1lbnRh/cy1pc29sYWRvXzEz/MDMtMjAzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8SZ_WJraRVMFXlhzoTK2HNAVCO5iqHtiWtt1tUzD9fr2n0HxYwpkpM51&s=10" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOVVOx4tArpXVtbipvHL9nCtKZ7MFwsXQ9hw5qoOqho01x46MEFzhIVs&s=10" },
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
    <section className="splide" aria-label="Splide Basic HTML Example">
      <div className="splide__track">
        <ul className="splide__list">
          {images.map((img, index) => (
            <li key={index} className="splide__slide">
              <img className="h-90 w-full" src={img.url} alt={`slide-image-${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  );
}

export default Header;