"use client";

// import React from "react";
// import GroupCardFeatured from "./components/GroupCardFeatured";
// import GroupCardSimple from "./components/GroupCardSimple";
// import {
//   useCreateCommunityMutation,
//   useGetCommunitiesQuery,
//   useJoinCommunityMutation,
// } from "@/slices/Community";

// // Mock data based on the image
// const featuredGroup = {
//   category: "Computer Science",
//   title: "Advanced Algorithms & Logic",
//   description:
//     "Deep dive into data structures, computational complexity, and practical algorithm design for...",
//   memberCount: "1.2k members",
//   imageSrc: "/images/algorithms-bg.jpg", // Replace with your image path
//   isPopular: true,
//   avatars: ["JD", "SM", "+12"],
// };

// const simpleGroups = [
//   {
//     title: "Organic Chemistry II",
//     memberCount: "45 active members",
//     description:
//       "Reviewing mechanism of reactions and spectroscopic identification of organic compounds.",
//     icon: "microscope",
//   },
//   {
//     title: "Modern History",
//     memberCount: "88 active members",
//     description:
//       "Discussion group focused on the geopolitical shifts of the 20th century and global impacts.",
//     icon: "monument",
//   },
// ];

// export default function StudyGroupsPage() {
//   const { data: communities } = useGetCommunitiesQuery();
//   const [createCommunity, { isLoading }] = useCreateCommunityMutation();
//   const [joinCommunity] = useJoinCommunityMutation();

//   const handleCreateGroup = async () => {
//     await createCommunity({
//       name: "New Study Group",
//       category: "General",
//       description: "A shared group for collaborative study sessions.",
//     });
//   };

//   const visibleGroups = communities?.length
//     ? communities.map((community: any) => ({
//         id: community.id,
//         title: community.name,
//         memberCount: "Join group",
//         description: community.description,
//         icon: "monument",
//       }))
//     : simpleGroups;

//   return (
//     <div className="min-h-screen bg-[#FAFAFE] text-[#1E1B4B]">
//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-[#4F46E5]">Study Groups</h1>
//             <p className="text-gray-500 mt-1 text-sm sm:text-base">
//               Join a community of learners or start your own group.
//             </p>
//           </div>
//           <button
//             onClick={handleCreateGroup}
//             disabled={isLoading}
//             className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-indigo-300 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-sm transition-colors self-start sm:self-center"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             {isLoading ? "Creating..." : "Create Group"}
//           </button>
//         </div>

//         {/* Responsive Grid System */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Featured/Popular Card takes up 2 slots on large screens */}
//           <div className="lg:col-span-2">
//             <GroupCardFeatured group={featuredGroup} />
//           </div>

//           {/* Render regular group cards */}
//           {visibleGroups.map((group: any, index: number) => (
//             <div
//               key={group.id || index}
//               className="col-span-1"
//               onClick={() => group.id && joinCommunity(group.id)}
//             >
//               <GroupCardSimple group={group} />
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Plus,
  ArrowRight,
  Clock,
  FileText,
  Folder,
  Calendar,
  Share2,
} from "lucide-react";
import Modal from "./modal/Collaboratemodal";
import {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useJoinGroupMutation,
} from "@/slices/GroupMember";
import { useRouter } from "next/navigation";

// Types
type BadgeType = "OWNER" | "JOINED";

// interface GroupCardProps {
//   id: string;
//   name: string;
//   avatarBgColor: string;
//   avatarTextColor?: string;
//   role: BadgeType;
//   title: string;
//   updatedAt: string;
//   notesCount: number;
//   filesCount: number;
//   membersCount: number;
//   memberAvatars: string[];
//   onClick?: () => void;
// }

interface ActionCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

// Sub-component: Action Card
const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  iconBgColor,
  title,
  description,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md"
  >
    <div className="flex items-center gap-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColor}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1" />
  </div>
);

export interface GroupCardProps {
  id: string;
  name: string;
  description?: string;
  role: string;
  createdAt: string;
  shareCode?: string;
  notesCount?: number;
  filesCount?: number;
  membersCount?: number;
  onClick?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  name,
  description,
  role,
  createdAt,
  shareCode = "N/A",
  notesCount = 0,
  filesCount = 0,
  membersCount = 0,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-sm rounded-2xl border border-indigo-100 bg-white p-5 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Header: Title & Role Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {name}
            </h3>
            {description && (
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {description}
              </p>
            )}
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
              role === "OWNER"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {role}
          </span>
        </div>

        {/* Metadata Details */}
        <div className="mt-4 space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            <span>
              Joined on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {shareCode && (
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-slate-400 shrink-0" />
              <span>Share Code:</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700">
                {shareCode}
              </span>
            </div>
          )}
        </div>

        <div className="my-4 border-t border-slate-100" />

        {/* Stats Section */}
        <div className="flex items-center gap-5 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-slate-400" />
            <span>{notesCount} notes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-4 w-4 text-slate-400" />
            <span>{filesCount} files</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs">
        <span className="text-slate-500 font-medium">
          {membersCount} members
        </span>
        <button className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          <span>Enter Workspace</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
// Main Section Component
export default function CollaborationDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"join" | "create">("join");
  const [createGroup, { isLoading: isCreatingGroup }] =
    useCreateGroupMutation();
  const [joinGroup, { isLoading: isJoinGroup }] = useJoinGroupMutation();
  const { data: getGroups, isLoading: isGetGroup } = useGetGroupsQuery();
  const router = useRouter();
  const handleOpenJoin = () => {
    setModalType("join");
    setShowModal(true);
  };

  const handleOpenCreate = () => {
    setModalType("create");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSubmitData = async ({
    firstInput,
    secondInput,
  }: {
    firstInput: string;
    secondInput: string;
  }) => {
    if (modalType === "join") {
      const response1 = await joinGroup(firstInput).unwrap;
    } else {
      const response = await createGroup({
        name: firstInput,
        description: secondInput,
      }).unwrap;
      console.log(response);
    }
  };
  console.log(getGroups, "getGroups");
  return (
    <div className="relative w-full bg-slate-50/50 p-6 md:p-8 min-h-screen">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Collaboration
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create or join a workspace and collaborate with your team.
          </p>
        </div>

        {/* Top Action Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ActionCard
            icon={<UserPlus className="h-5 w-5 text-indigo-600" />}
            iconBgColor="bg-indigo-50"
            title="Join Group"
            description="Join an existing collaboration workspace."
            onClick={handleOpenJoin}
          />
          <ActionCard
            icon={<Plus className="h-5 w-5 text-white" />}
            iconBgColor="bg-indigo-600"
            title="Create Group"
            description="Create a new workspace for your team."
            onClick={handleOpenCreate}
          />
        </div>

        {/* Groups Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Groups</h2>
            <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Group Cards Grid */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {getGroups?.map((groupItem: any) => (
              <GroupCard
                key={groupItem.id || groupItem.group?.id}
                id={groupItem.group?.id}
                name={groupItem.group?.name || "Untitled Group"}
                description={groupItem.group?.description}
                role={groupItem.role || "MEMBER"}
                createdAt={
                  groupItem.group?.createdAt || new Date().toISOString()
                }
                shareCode={groupItem.group?.shareCode || "N/A"}
                notesCount={groupItem.group?._count?.notes || 0}
                filesCount={groupItem.group?._count?.files || 0}
                membersCount={groupItem.group?._count?.members || 0}
                onClick={() =>
                  router.push(`/group/note/${groupItem.group?.id}`)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Full-screen Modal Overlay */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              heading={modalType === "join" ? "Join Group" : "Create Group"}
              first_label_name={
                modalType === "join" ? "Invite Code" : "Group Name"
              }
              second_label_name={modalType === "create" ? "Description" : ""}
              first_placeholder={
                modalType === "join"
                  ? "Enter invite code..."
                  : "Enter group name..."
              }
              second_placeholder={
                modalType === "create" ? "Enter group description..." : ""
              }
              onClose={() => setShowModal(false)}
              onSubmit={handleSubmitData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
