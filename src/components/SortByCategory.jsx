import { useDispatch, useSelector } from "react-redux";
import { setFilterByCategory } from "../features/bookSlice";

const SortByCategory = () => {
  const { bookCategory } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleBookCategory = (e) => {
    const { value, checked } = e.target;

    checked
      ? dispatch(setFilterByCategory({ type: "insert", value }))
      : dispatch(setFilterByCategory({ type: "remove", value }));
  };

  return (
    <div className="py-4">
      <h3>Category</h3>
      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="checkbox"
          value={`All`}
          checked={bookCategory.includes("All")}
          id="flexCheckDefault"
          onChange={handleBookCategory}
        />
        <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
          All
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="checkbox"
          value={`Historical`}
          checked={bookCategory.includes("Historical")}
          id="flexCheckDefault"
          onChange={handleBookCategory}
        />
        <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
          Historical
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="checkbox"
          value={`Fiction`}
          checked={bookCategory.includes("Fiction")}
          id="flexCheckDefault"
          onChange={handleBookCategory}
        />
        <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
          Fiction
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="checkbox"
          value={`Self Help`}
          checked={bookCategory.includes("Self Help")}
          id="flexCheckDefault"
          onChange={handleBookCategory}
        />
        <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
          Self Help
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="checkbox"
          value={`Biography`}
          checked={bookCategory.includes("Biography")}
          id="flexCheckDefault"
          onChange={handleBookCategory}
        />
        <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
          Biography
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="checkbox"
          value={`Entrepreneurship`}
          checked={bookCategory.includes("Entrepreneurship")}
          id="flexCheckDefault"
          onChange={handleBookCategory}
        />
        <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
          Entrepreneurship
        </label>
      </div>
    </div>
  );
};

export default SortByCategory;
