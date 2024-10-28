import { useDispatch } from "react-redux";
import styles from "./css/clearFilters.module.css";
import {
  setFilterByCategory,
  setFilterByPrice,
  setFilterByRating,
  setSortByHighLow,
} from "../features/bookSlice";

const ClearFilters = () => {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(setFilterByPrice(1499));
    dispatch(setFilterByCategory({ type: "insert", value: "All" }));
    dispatch(setFilterByRating(null));
    dispatch(setSortByHighLow(null));
  };

  return (
    <div className="pt-5 pb-3 d-flex align-items-center justify-content-between">
      <h2 className="fw-semibold">Filters</h2>
      <h3 className={`fw-semibold ${styles.clearIt}`} onClick={handleClear}>
        <ins>Clear</ins>
      </h3>
    </div>
  );
};

export default ClearFilters;
