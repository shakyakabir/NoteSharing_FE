import Config from "@/config/Index";
import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Community", "Post", "Resource"],
  endpoints: (builder) => ({
    createCommunity: builder.mutation({
      query: (data) => ({
        url: "/communities",
        method: "POST",
        body: {
          ownerEmail: Config.defaultEmail,
          ...data,
        },
      }),
      invalidatesTags: ["Community"],
    }),
    getCommunities: builder.query<any, void>({
      query: () => ({
        url: "/communities",
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
    joinCommunity: builder.mutation({
      query: (id) => ({
        url: `/communities/${id}/join`,
        method: "POST",
        params: { email: Config.defaultEmail },
      }),
      invalidatesTags: ["Community"],
    }),
    leaveCommunity: builder.mutation({
      query: (id) => ({
        url: `/communities/${id}/leave`,
        method: "DELETE",
        params: { email: Config.defaultEmail },
      }),
      invalidatesTags: ["Community"],
    }),
    getMembers: builder.query({
      query: (id) => ({
        url: `/communities/${id}/members`,
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
    createPost: builder.mutation({
      query: ({ communityId, ...data }) => ({
        url: `/communities/${communityId}/posts`,
        method: "POST",
        body: {
          authorEmail: Config.defaultEmail,
          ...data,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    getPosts: builder.query({
      query: (communityId) => ({
        url: `/communities/${communityId}/posts`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/communities/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    shareResource: builder.mutation({
      query: ({ communityId, ...data }) => ({
        url: `/communities/${communityId}/resources`,
        method: "POST",
        body: {
          sharedByEmail: Config.defaultEmail,
          ...data,
        },
      }),
      invalidatesTags: ["Resource"],
    }),
    getSharedResources: builder.query({
      query: (communityId) => ({
        url: `/communities/${communityId}/resources`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
  }),
});

export const {
  useCreateCommunityMutation,
  useGetCommunitiesQuery,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
  useGetMembersQuery,
  useCreatePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useShareResourceMutation,
  useGetSharedResourcesQuery,
} = communityApi;
