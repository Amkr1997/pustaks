import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchBooksAsync = createAsyncThunk("fetch/Books", async () => {
  try {
    const books = await axios.get(`${API_URL}/newBooks`);
    return books.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchBookByCategory = createAsyncThunk(
  "fetch/BookByCategory",
  async (bookData) => {
    try {
      const books = await axios.get(`${API_URL}/newBooks/${bookData}`);
      return books.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const handleSort = (state) => {
  let sortByHighLow = state.filterByRating;

  if (state.highLow !== null) {
    if (state.highLow === "Low") {
      state.filterByRating = state.filterByRating.sort(
        (a, b) => a.price - b.price
      );
    } else if (state.highLow === "High") {
      state.filterByRating = state.filterByRating.sort(
        (a, b) => b.price - a.price
      );
    }
  } else {
    state.filterByRating = sortByHighLow;
  }
};

const handlePrice = (books, priceVal) =>
  books.filter((book) => book.price <= priceVal);

const handleCategory = (filterByPrice, bookCategory) =>
  !bookCategory.includes("All")
    ? filterByPrice.filter((book) => {
        if (bookCategory.includes(book.category)) {
          return book;
        }
      })
    : filterByPrice;

const handleRating = (filterByCategory, bookRating) =>
  bookRating !== null
    ? filterByCategory.filter((book) => book.rating >= bookRating)
    : filterByCategory;

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

      state.filterByPrice = handlePrice(state.books, state.priceVal);

      state.filterByCategory = handleCategory(
        state.filterByPrice,
        state.bookCategory
      );

      state.filterByRating = handleRating(
        state.filterByCategory,
        state.bookRating
      );

      handleSort(state);
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

      state.filterByCategory = handleCategory(
        state.filterByPrice,
        state.bookCategory
      );

      state.filterByRating = handleRating(
        state.filterByCategory,
        state.bookRating
      );

      handleSort(state);
    },

    setFilterByRating: (state, action) => {
      state.bookRating = action.payload;

      state.filterByRating = handleRating(
        state.filterByCategory,
        state.bookRating
      );

      handleSort(state);
    },

    setSortByHighLow: (state, action) => {
      state.highLow = action.payload;
      handleSort(state);
    },

    setSearchInp: (state, action) => {
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
