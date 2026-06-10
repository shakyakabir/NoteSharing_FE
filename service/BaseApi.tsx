import Config from "@/config/Index";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.baseUrl,
  credentials: "include",
});
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // NORMAL REQUEST
  let result = await baseQuery(args, api, extraOptions);
  console.log("BaseApi result:", result);
  // ACCESS TOKEN EXPIRED
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === "FETCH_ERROR")
  ) {
    // TRY REFRESH TOKEN
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    // REFRESH SUCCESS
    if (refreshResult.data) {
      // RETRY ORIGINAL REQUEST
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Session expired");

      // OPTIONAL LOGOUT REDIRECT
      // window.location.href = "/login";
    }
  }

  return result;
};

export default customBaseQuery;
