import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../components/css/carousel.css";
import imageOne from "../assets/heroCarousel/heroOne.jpeg";
import imageTwo from "../assets/heroCarousel/heroTwo.jpeg";
import imageThree from "../assets/heroCarousel/heroThree.jpeg";

const heroImages = [imageOne, imageTwo, imageThree];

const LeftButton = (props) => {
  const { className, onClick } = props;

  return (
    <>
      <button
        className={`carousel-control-prev ${className}`}
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        onClick={onClick}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
    </>
  );
};

const RightButton = (props) => {
  const { className, onClick } = props;

  return (
    <>
      <button
        className={`carousel-control-next ${className}`}
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        onClick={onClick}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </>
  );
};

const Carousel = () => {
  let settings = {
    autoplay: true,
    pauseOnHover: true,
    infinite: true,
    autoplaySpeed: 2000,
    prevArrow: <LeftButton />,
    nextArrow: <RightButton />,
  };

  return (
    <section className="" style={{ margin: "2rem 2rem" }}>
      <Slider {...settings}>
        {heroImages.map((image, index) => {
          return (
            <div key={index} className="">
              <img
                src={image}
                alt="poster-image"
                style={{
                  width: "100%",
                  height: "23.75rem",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Carousel;
