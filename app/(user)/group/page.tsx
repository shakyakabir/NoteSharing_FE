"use client";

import React from "react";
import GroupCardFeatured from "./components/GroupCardFeatured";
import GroupCardSimple from "./components/GroupCardSimple";
import {
  useCreateCommunityMutation,
  useGetCommunitiesQuery,
  useJoinCommunityMutation,
} from "@/slices/Community";

// Mock data based on the image
const featuredGroup = {
  category: "Computer Science",
  title: "Advanced Algorithms & Logic",
  description:
    "Deep dive into data structures, computational complexity, and practical algorithm design for...",
  memberCount: "1.2k members",
  imageSrc: "/images/algorithms-bg.jpg", // Replace with your image path
  isPopular: true,
  avatars: ["JD", "SM", "+12"],
};

const simpleGroups = [
  {
    title: "Organic Chemistry II",
    memberCount: "45 active members",
    description:
      "Reviewing mechanism of reactions and spectroscopic identification of organic compounds.",
    icon: "microscope",
  },
  {
    title: "Modern History",
    memberCount: "88 active members",
    description:
      "Discussion group focused on the geopolitical shifts of the 20th century and global impacts.",
    icon: "monument",
  },
];

export default function StudyGroupsPage() {
  const { data: communities } = useGetCommunitiesQuery();
  const [createCommunity, { isLoading }] = useCreateCommunityMutation();
  const [joinCommunity] = useJoinCommunityMutation();

  const handleCreateGroup = async () => {
    await createCommunity({
      name: "New Study Group",
      category: "General",
      description: "A shared group for collaborative study sessions.",
    });
  };

  const visibleGroups = communities?.length
    ? communities.map((community: any) => ({
        id: community.id,
        title: community.name,
        memberCount: "Join group",
        description: community.description,
        icon: "monument",
      }))
    : simpleGroups;

  return (
    <div className="min-h-screen bg-[#FAFAFE] text-[#1E1B4B]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#4F46E5]">Study Groups</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Join a community of learners or start your own group.
            </p>
          </div>
          <button
            onClick={handleCreateGroup}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-indigo-300 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-sm transition-colors self-start sm:self-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {isLoading ? "Creating..." : "Create Group"}
          </button>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured/Popular Card takes up 2 slots on large screens */}
          <div className="lg:col-span-2">
            <GroupCardFeatured group={featuredGroup} />
          </div>

          {/* Render regular group cards */}
          {visibleGroups.map((group: any, index: number) => (
            <div
              key={group.id || index}
              className="col-span-1"
              onClick={() => group.id && joinCommunity(group.id)}
            >
              <GroupCardSimple group={group} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
