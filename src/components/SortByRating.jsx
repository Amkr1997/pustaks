import { useDispatch, useSelector } from "react-redux";
import { setFilterByRating } from "../features/bookSlice";

const SortByRating = () => {
  const { bookRating } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleRating = (e) => {
    const { value } = e.target;

    dispatch(setFilterByRating(Number(value)));
  };

  return (
    <div className="py-4">
      <h3>Sort By Rating</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={4}
          checked={bookRating === 4}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={handleRating}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          4⭐⭐⭐⭐
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={3}
          checked={bookRating === 3}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={handleRating}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          3⭐⭐⭐
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={2}
          checked={bookRating === 2}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={handleRating}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          2⭐⭐
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={1}
          checked={bookRating === 1}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={handleRating}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          1⭐
        </label>
      </div>
    </div>
  );
};

export default SortByRating;
