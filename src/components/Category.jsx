import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../components/css/category.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import biography from "../assets/categoryImages/biography.avif";
import buisness from "../assets/categoryImages/buisness.webp";
import fiction from "../assets/categoryImages/fiction.avif";
import historical from "../assets/categoryImages/historical.avif";
import selfHelp from "../assets/categoryImages/selfHelp.avif";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterByCategory,
  setFilterByPrice,
  setFilterByRating,
  setSortByHighLow,
} from "../features/bookSlice";

const categoryImages = [historical, selfHelp, fiction, biography, buisness];

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
  const { status } = useSelector((state) => state.books);
  const bookCategories = books?.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;

    return acc;
  }, {});
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (status === "success") {
      dispatch(setFilterByPrice(1499));
      dispatch(setFilterByCategory({ type: "insert", value: "All" }));
      dispatch(setFilterByRating(null));
      dispatch(setSortByHighLow(null));
    }
  }, [status]);

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
