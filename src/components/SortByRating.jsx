import { useDispatch, useSelector } from "react-redux";
import { setFilterByRating } from "../features/bookSlice";

const SortByRating = () => {
  const { bookRating } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleRating = (e) => {
    const { value } = e.target;

    dispatch(setFilterByRating(value));
  };

  return (
    <div className="py-4">
      <h3>Sort By Rating</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={"4"}
          checked={bookRating === "4"}
          name="rating"
          onChange={handleRating}
        />
        <label className="form-check-label">4⭐⭐⭐⭐</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={"3"}
          checked={bookRating === "3"}
          name="rating"
          onChange={handleRating}
        />
        <label className="form-check-label">3⭐⭐⭐</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={"2"}
          checked={bookRating === "2"}
          name="rating"
          onChange={handleRating}
        />
        <label className="form-check-label">2⭐⭐</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={"1"}
          checked={bookRating === "1"}
          name="rating"
          onChange={handleRating}
        />
        <label className="form-check-label">1⭐</label>
      </div>
    </div>
  );
};

export default SortByRating;
