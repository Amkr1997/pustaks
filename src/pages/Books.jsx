import Filters from "../components/Filters";
import BookList from "../components/BookList";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBookByCategory, fetchBooksAsync } from "../features/bookSlice";
import Footer from "../components/Footer";
import NavbarTwo from "../components/NavbarTwo";

const Books = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    state !== null
      ? dispatch(fetchBookByCategory(state))
      : dispatch(fetchBooksAsync());
  }, []);

  return (
    <>
      <NavbarTwo />
      <section className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <Filters state={state} />
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <BookList />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Books;
