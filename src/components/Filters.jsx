import { useSelector } from "react-redux";
import ClearFilters from "./ClearFilters";
import SortByCategory from "./SortByCategory";
import SortByHighLow from "./SortByHighLow";
import SortByPrice from "./SortByPrice";
import SortByRating from "./SortByRating";

const Filters = ({ state }) => {
  return (
    <>
      <ClearFilters />
      <SortByPrice />
      {state === null && <SortByCategory />}
      <SortByRating />
      <SortByHighLow />
    </>
  );
};

export default Filters;
