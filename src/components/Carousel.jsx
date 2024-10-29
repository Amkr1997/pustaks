import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../components/css/carousel.css";

const images = [
  "https://images.pexels.com/photos/3861778/pexels-photo-3861778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5192573/pexels-photo-5192573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

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
      {/* Removed from section for now.*/}
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div key={index} className="">
              <img
                src={image}
                alt="poster-image"
                style={{
                  width: "100%",
                  height: "23.75rem",
                  objectFit: "fill",
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
