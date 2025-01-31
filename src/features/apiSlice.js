import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;

const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["GetUserId", "GetSingleUser"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("pustaksToken");

      const protectedEndpoints = ["getLoginUserData"];

      if (token && protectedEndpoints.includes(endpoint)) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      // OrderHistory Routes
      addOrder: builder.mutation({
        query: ({ bookId, data, userId }) => {
          return {
            url: `/add/${bookId}/order/history/${userId}`,
            method: "POST",
            body: data,
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      deleteOrder: builder.mutation({
        query: ({ bookId, userId }) => {
          return {
            url: `/delete/${bookId}/order/history/${userId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      // AddToCart Routes
      addToCart: builder.mutation({
        query: ({ bookId, userId }) => {
          return {
            url: `/book/${userId}/cart/${bookId}`,
            method: "POST",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      reduceBookInCart: builder.mutation({
        query: ({ bookId, userId }) => {
          return {
            url: `/reduce/book/${userId}/cart/${bookId}`,
            method: "POST",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      deleteFromCart: builder.mutation({
        query: ({ bookId, userId }) => {
          return {
            url: `/removeBook/${userId}/cart/${bookId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      // Wishlist Routes
      addToWishlist: builder.mutation({
        query: ({ bookId, userId }) => {
          return {
            url: `/book/${userId}/wishlist/${bookId}`,
            method: "POST",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      deleteFromWishlist: builder.mutation({
        query: ({ bookId, userId }) => {
          return {
            url: `/removeBook/${userId}/wishlist/${bookId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      // Address routes
      addAddress: builder.mutation({
        query: ({ formDetails, userId }) => {
          return {
            url: `/add/address/${userId}`,
            method: "POST",
            body: formDetails,
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      updateAddress: builder.mutation({
        query: (userData) => {
          return {
            url: `/update/${userData?.userId}/address/${userData?.addressId}`,
            method: "POST",
            body: userData,
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      deleteAddress: builder.mutation({
        query: (data) => {
          return {
            url: `/delete/${data.userId}/address/${data.addressId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetUserId", "GetSingleUser"],
      }),

      // User Routes
      registerUser: builder.mutation({
        query: (userData) => {
          return {
            url: `/register`,
            method: "POST",
            body: userData,
          };
        },
      }),

      loginUser: builder.mutation({
        query: (userData) => {
          return {
            url: `/login`,
            method: "POST",
            body: userData,
          };
        },
      }),

      getLoginUserData: builder.query({
        query: () => {
          return {
            url: `/profile/data`,
            method: "GET",
          };
        },

        transformResponse: (data) => {
          return data?.loginedUser;
        },

        providesTags: ["GetUserId"],
      }),

      getSingleUser: builder.query({
        query: (userId) => {
          return {
            url: `/single/user/${userId}`,
            method: "GET",
          };
        },

        transformResponse: (data) => {
          return data?.singleUser;
        },

        providesTags: ["GetSingleUser"],
      }),
    };
  },
});

export const {
  useAddOrderMutation,
  useDeleteOrderMutation,
  useReduceBookInCartMutation,
  useDeleteFromCartMutation,
  useAddToCartMutation,
  useAddToWishlistMutation,
  useDeleteFromWishlistMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useGetLoginUserDataQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetSingleUserQuery,
} = apiSlice;
export default apiSlice;
