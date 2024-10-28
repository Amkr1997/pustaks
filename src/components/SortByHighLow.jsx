import { useDispatch, useSelector } from "react-redux";
import { setSortByHighLow } from "../features/bookSlice";

const SortByHighLow = () => {
  const { highLow } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleSortByHighLow = (e) => {
    const { value } = e.target;

    dispatch(setSortByHighLow(value));
  };

  return (
    <div className="py-4">
      <h3>Sort By Price High/Low</h3>
      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="radio"
          value={`High`}
          checked={highLow === "High"}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={handleSortByHighLow}
        />
        <label className="form-check-label fs-5" htmlFor="flexRadioDefault1">
          High
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input fs-5"
          type="radio"
          value={`Low`}
          checked={highLow === "Low"}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={handleSortByHighLow}
        />
        <label className="form-check-label fs-5" htmlFor="flexRadioDefault1">
          Low
        </label>
      </div>
    </div>
  );
};

export default SortByHighLow;
