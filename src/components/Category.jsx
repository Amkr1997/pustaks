import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../components/css/category.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const categoryImages = [
  "https://plus.unsplash.com/premium_photo-1667239420580-e4ded4d0fb53?q=80&w=2004&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1521123845560-14093637aa7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1655310722170-97dd42bdc734?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/8353833/pexels-photo-8353833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const LeftButton = (props) => {
  const { className, onClick } = props;

  return (
    <>
      <button
        className={`carousel-control-prev leftBtnCat ${className}`}
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
        className={`carousel-control-next rightBtnCat ${className}`}
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

const Category = ({ books, error }) => {
  const bookCategories = books?.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;

    return acc;
  }, {});

  let settings = {
    infinite: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <LeftButton />,
    nextArrow: <RightButton />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          centerMode: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          centerMode: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 402,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      <section className={`container ${styles.categoryContainer}`}>
        <h1 className="text-center py-4 my-0">Categories</h1>

        <div className={`${styles.sliderComp} rounded-4 py-5`}>
          <Slider {...settings}>
            {Object.keys(bookCategories).map((category, index) => {
              return (
                <Link
                  to={"/books"}
                  key={index}
                  className={`${styles.category} px-4`}
                  state={category}
                >
                  <div className="card">
                    <div className="card-body p-1">
                      <img
                        src={categoryImages[index]}
                        className={`card-img-top ${styles.categoryImg}`}
                        alt="category-image"
                        style={{ height: "10rem" }}
                      />
                      <h3 className="text-center m-0 py-2 text-uppercase">
                        {category === "Entrepreneurship"
                          ? "business"
                          : category}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Category;
