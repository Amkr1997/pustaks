import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import "../components/css/carousel.css";
import styles from "../components/css/bookDetails.module.css";
import Slider from "react-slick";
import BookDescription from "../components/BookDescription";
import { useEffect } from "react";
import { fetchBooksAsync } from "../features/bookSlice";
import Loading from "../components/Loading";
import RelevantBooks from "../components/RelevantIBooks";
import NavbarTwo from "../components/NavbarTwo";

const LeftBtn = (props) => {
  const { className, onClick } = props;

  return (
    <button
      className={`carousel-control-prev leftDetailsBtn ${className}`}
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
      onClick={onClick}
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
  );
};

const RigthBtn = (props) => {
  const { className, onClick } = props;

  return (
    <button
      className={`carousel-control-next rightDetailsBtn ${className}`}
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
      onClick={onClick}
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  );
};

const BookDetails = () => {
  const { filterByRating, status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { bookId } = useParams();

  const foundBookObj = filterByRating?.find((book) => book._id === bookId);

  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, []);

  let settings = {
    dots: true,
    prevArrow: <LeftBtn />,
    nextArrow: <RigthBtn />,
  };

  return (
    <>
      {error && <p>{error.message}</p>}

      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <NavbarTwo />
          <section className="container py-5">
            <div className="row pb-4">
              <div className={`col-md-4 ${styles.bookImg} mb-5 mb-md-0`}>
                <Slider {...settings} className="slick-Container">
                  {foundBookObj?.imageUrl?.map((img, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={img}
                          className={`${styles.img} img-fluid`}
                          alt="book image"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>

              <div className="col-md-1"></div>

              <div className="col-md-7">
                <BookDescription foundBookObj={foundBookObj} />
              </div>
            </div>
            <hr />
            <RelevantBooks
              filterByRating={filterByRating}
              foundBookObj={foundBookObj}
            />
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default BookDetails;
