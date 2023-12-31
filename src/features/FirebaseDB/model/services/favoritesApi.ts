import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "widgets/api/config/baseApi";

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  idDB: string
}

interface Favorite {
  [key: string]: Movie;
}

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Favorites"],
  endpoints: (build) => ({
    getFavoritesMovies: build.query<Movie[], void>({
      query: () => ({
        url: "favorites.json",
      }),
      transformResponse: (data: Favorite): Movie[] => {
        let filmsFromDB: Movie[] = [];
        if (data) {
          filmsFromDB = Object.entries(data).map((item) => ({
            idDB: item[0],
            ...item[1],
          }));
        }
        return filmsFromDB;
      },
      providesTags: ["Favorites"],
    }),
    addMovie: build.mutation({
      query: (movie) => ({
        url: "favorites.json",
        method: "POST",
        body: movie,
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeMovie: build.mutation({
      query: (id) => ({
        url: `favorites/${id}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeAllFavorites: build.mutation({
      query: () => ({
        url: "favorites.json",
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});
