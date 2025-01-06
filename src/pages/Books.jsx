import Filters from "../components/Filters";
import BookList from "../components/BookList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooksAsync, setFilterByCategory } from "../features/bookSlice";
import Footer from "../components/Footer";
import NavbarTwo from "../components/NavbarTwo";

const Books = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { books, searchInput, filterByRating } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooksAsync());
    }
  }, [books, dispatch]);

  useEffect(() => {
    if (state !== null) {
      dispatch(setFilterByCategory({ type: "insert", value: state }));
    }
  }, [state, dispatch, books]);

  let filteredBooks = filterByRating?.filter((book) =>
    book?.name?.toLowerCase().includes(searchInput)
  );

  return (
    <>
      <NavbarTwo />
      <section className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <Filters state={state} />
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <BookList filteredBooks={filteredBooks} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Books;
