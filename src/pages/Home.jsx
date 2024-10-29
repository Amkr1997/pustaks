import { useSelector, useDispatch } from "react-redux";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import Footer from "../components/Footer";
import NewFiction from "../components/NewFiction";
import NewHistorical from "../components/NewHistorical";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { fetchBooksAsync } from "../features/bookSlice";
import NavbarTwo from "../components/NavbarTwo";

const Home = () => {
  const { status, error, books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, []);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <NavbarTwo />
          <Carousel />
          <Category books={books} error={error} />
          <NewFiction books={books} error={error} />
          <NewHistorical books={books} error={error} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
