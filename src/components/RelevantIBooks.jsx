import Slider from "react-slick";
import "./css/carousel.css";
import { Link } from "react-router-dom";
import styles from "./css/relevantBooks.module.css";

const RelevantBooks = ({ filterByRating, foundBookObj }) => {
  const relatedBooks = filterByRating.filter(
    (book) => book.category === foundBookObj.category
  );

  //console.log(relatedBooks);

  return (
    <section className={`py-4 container`}>
      <h2 className="fs-1 text-center py-4 my-0">
        More ({foundBookObj?.category}) related books
      </h2>
      <div className="row rounded-4">
        {relatedBooks?.slice(0, 3).map((book) => {
          return (
            <Link
              to={`/bookDetails/${book._id}`}
              key={book._id}
              className={`col-md-4 mb-3 ${styles.relavantBooksContainer}`}
            >
              <div className="card h-100">
                <div className="card-header">
                  <img
                    src={book?.imageUrl[0]}
                    className={`${styles.relvantImages} img-fluid`}
                    alt="book image"
                    style={{
                      height: "15rem",
                      width: "100%",
                      objectFit: "fill",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column align-items-center justify-content-between">
                  <p className="card-text m-0 fs-5 text-center fw-normal">
                    {book.name}
                  </p>
                  <p className="card-title fs-4 fw-medium m-0">₹{book.price}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelevantBooks;
