import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooksAsync = createAsyncThunk("fetch/books", async () => {
  try {
    const books = await axios.get(
      `https://major-project-1-backend-gray.vercel.app/newBooks`
    );

    return books.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchBookByCategory = createAsyncThunk(
  "fetch/booksByCat",
  async (bookData) => {
    try {
      const books = await axios.get(
        `https://major-project-1-backend-gray.vercel.app/newBooks/${bookData}`
      );

      return books.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const handleSortTwo = (state) => {
  if (state.highLow !== null) {
    if (state.highLow === "Low") {
      state.sortByHighLow = state.filterByRating.sort(
        (a, b) => a.price - b.price
      );
    } else if (state.highLow === "High") {
      state.sortByHighLow = state.filterByRating.sort(
        (a, b) => b.price - a.price
      );
    }
  } else {
    state.sortByHighLow = state.filterByRating;
  }
};

const handleSort = (state) =>
  (state.sortByHighLow =
    state.highLow !== null
      ? state.highLow === "Low"
        ? state.filterByRating.sort((a, b) => a.price - b.price)
        : state.filterByRating.sort((a, b) => b.price - a.price)
      : state.filterByRating);

const handlePrice = (priceVal, books) => {
  return books.filter((book) => book.price <= priceVal);
};

const handleCategory = (bookCategory, filterByPrice) => {
  return !bookCategory.includes("All")
    ? filterByPrice.filter((book) => bookCategory.includes(book.category))
    : filterByPrice;
};

const handleRating = (bookRating, filterByCategory) => {
  console.log(bookRating);

  return bookRating !== null
    ? filterByCategory.filter((book) => book.rating >= bookRating)
    : filterByCategory;
};

const handleFilters = (state) => {
  state.filterByPrice = state.books.filter(
    (book) => book.price <= state.priceVal
  );

  if (!state.bookCategory.includes("All")) {
    state.filterByCategory = state.filterByPrice.filter((book) =>
      state.bookCategory.includes(book.category)
    );
  } else {
    state.filterByCategory = state.filterByPrice;
  }

  if (state.bookRating !== null) {
    state.filterByRating = state.filterByCategory.filter(
      (book) => book.rating >= state.bookRating
    );
  } else {
    state.filterByRating = state.filterByCategory;
  }

  if (state.highLow === "Low") {
    state.sortByHighLow = state.filterByRating.sort(
      (a, b) => a.price - b.price
    );
  } else if (state.highLow === "High") {
    state.sortByHighLow = state.filterByRating.sort(
      (a, b) => b.price - a.price
    );
  } else {
    state.sortByHighLow = state.filterByRating;
  }
};

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
    priceVal: 1499,
    bookCategory: ["All"],
    bookRating: null,
    highLow: null,
    filterByPrice: [],
    filterByCategory: [],
    filterByRating: [],
    sortByHighLow: [],
    searchInput: "",
    filterBySearch: [],
  },

  reducers: {
    setFilterByPrice: (state, action) => {
      state.priceVal = action.payload;
      handleFilters(state);
      /*state.filterByPrice = handlePrice(state.priceVal, state.books);

      state.filterByCategory = handleCategory(
        state.bookCategory,
        state.filterByPrice
      );

      state.filterByRating = handleRating(
        state.bookRating,
        state.filterByCategory
      );

      handleSortTwo(state);
      handleSort(state);*/
    },

    setFilterByCategory: (state, action) => {
      const { type, value } = action.payload;

      if (type === "insert") {
        value === "All"
          ? (state.bookCategory = [value])
          : (state.bookCategory = [
              ...state.bookCategory.filter((category) => category !== "All"),
              value,
            ]);
      } else if (type === "remove") {
        state.bookCategory = state.bookCategory.filter(
          (category) => category !== value
        );
      }

      handleFilters(state);

      /* state.filterByCategory = handleCategory(
        state.bookCategory,
        state.filterByPrice
      );

      state.filterByRating = handleRating(
        state.bookRating,
        state.filterByCategory
      );

      handleSortTwo(state);
      handleSort(state);*/
    },

    setFilterByRating: (state, action) => {
      state.bookRating = action.payload;
      handleFilters(state);

      /*state.filterByRating = handleRating(
        state.bookRating,
        state.filterByCategory
      );

      handleSortTwo(state);
      handleSort(state);*/
    },

    setSortByHighLow: (state, action) => {
      state.highLow = action.payload;
      handleFilters(state);

      /*handleSortTwo(state);
      handleSort(state);*/
    },

    setSearchInp: (state, action) => {
      //console.log(action.payload);
      state.searchInput = action.payload;
    },

    setFilterSearch: (state, action) => {
      state.filterBySearch = state.filterByRating.filter(
        (book) => book.name.toLowerCase() === action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchBooksAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchBooksAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
      state.filterByPrice = state.books;
      state.filterByCategory = state.filterByPrice;
      state.filterByRating = state.filterByCategory;
    });

    builder.addCase(fetchBooksAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      fetchBookByCategory.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchBookByCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
      state.filterByPrice = state.books;
      state.filterByCategory = state.filterByPrice;
      state.filterByRating = state.filterByCategory;
    });

    builder.addCase(fetchBookByCategory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const {
  setFilterByPrice,
  setFilterByCategory,
  setFilterByRating,
  setSortByHighLow,
  setSearchInp,
  setFilterSearch,
} = bookSlice.actions;

export default bookSlice;
