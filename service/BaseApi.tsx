import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",

  // IMPORTANT
  credentials: "include",
});

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // First request
  let result = await baseQuery(args, api, extraOptions);

  // If unauthorized
  if (result.error && result.error.status === 401) {
    console.log("Access token expired");

    // Try refresh
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    // Refresh success
    if (refreshResult.data) {
      console.log("Token refreshed");

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh failed");
    }
  }

  return result;
};

export default baseQueryWithRefresh;
