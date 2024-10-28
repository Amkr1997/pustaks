import { useDispatch, useSelector } from "react-redux";
import { setFilterByPrice } from "../features/bookSlice";

const SortByPrice = () => {
  const { priceVal } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    const { value } = e.target;

    dispatch(setFilterByPrice(Number(value)));
  };

  return (
    <div className="pt-5 pb-4">
      <h3 htmlFor="customRange2" className="form-label fw-semibold pb-1">
        Price
      </h3>

      <div className="d-flex align-items-center justify-content-between pb-2">
        <span className="fs-5">299</span>
        <span className="fs-5">599</span>
        <span className="fs-5">899</span>
        <span className="fs-5">1199</span>
        <span className="fs-5">1499</span>
      </div>

      <input
        className="form-range w-100"
        id="customRange2"
        type="range"
        min={"299"}
        max={"1499"}
        step={"300"}
        value={priceVal}
        onChange={handlePriceChange}
      />
    </div>
  );
};

export default SortByPrice;
