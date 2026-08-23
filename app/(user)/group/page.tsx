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

interface GroupCardProps {
  id: string;
  name: string;
  avatarBgColor: string;
  avatarTextColor?: string;
  role: BadgeType;
  title: string;
  updatedAt: string;
  notesCount: number;
  filesCount: number;
  membersCount: number;
  memberAvatars: string[];
  onClick?: () => void;
}

interface ActionCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

// Sample Data
const GROUPS_DATA: GroupCardProps[] = [
  {
    id: "1",
    initials: "AI",
    avatarBgColor: "bg-indigo-100",
    avatarTextColor: "text-indigo-600",
    role: "OWNER",
    title: "AI Product Team",
    updatedAt: "Updated 5 mins ago",
    notesCount: 24,
    filesCount: 6,
    membersCount: 8,
    memberAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "2",
    initials: "RG",
    avatarBgColor: "bg-amber-100",
    avatarTextColor: "text-amber-600",
    role: "JOINED",
    title: "Research Group",
    updatedAt: "Updated 20 mins ago",
    notesCount: 12,
    filesCount: 3,
    membersCount: 5,
    memberAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "3",
    initials: "MT",
    avatarBgColor: "bg-purple-100",
    avatarTextColor: "text-purple-600",
    role: "JOINED",
    title: "Marketing Team",
    updatedAt: "Updated yesterday",
    notesCount: 18,
    filesCount: 4,
    membersCount: 6,
    memberAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "4",
    initials: "UP",
    avatarBgColor: "bg-emerald-400",
    avatarTextColor: "text-white",
    role: "OWNER",
    title: "University Project",
    updatedAt: "Updated 2 hours ago",
    notesCount: 9,
    filesCount: 2,
    membersCount: 4,
    memberAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ],
  },
];

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

// Sub-component: Group Card
const GroupCard: React.FC<GroupCardProps> = ({
  name,
  avatarBgColor,
  avatarTextColor = "text-gray-800",
  role,
  title,
  updatedAt,
  notesCount,
  filesCount,
  membersCount,
  memberAvatars,
  onClick,
}) => {
  const extraCount = membersCount - memberAvatars?.length || 0;

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md cursor-pointer"
    >
      <div className="p-5">
        {/* Header Badge & Initials */}
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold ${avatarBgColor} ${avatarTextColor}`}
          >
            {name}
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider ${
              role === "OWNER"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {role}
          </span>
        </div>

        {/* Info */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span>{updatedAt}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-gray-400" />
            <span>{notesCount} notes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-4 w-4 text-gray-400" />
            <span>{filesCount} files</span>
          </div>
        </div>
      </div>

      {/* Footer / Members */}
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5 bg-gray-50/50 rounded-b-2xl">
        <div className="flex items-center -space-x-2 overflow-hidden">
          {memberAvatars?.map((url, idx) => (
            <img
              key={idx}
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
              src={url}
              alt="Avatar"
            />
          ))}
          {extraCount > 0 && (
            <div className="flex h-7 items-center justify-center rounded-full bg-gray-100 px-1.5 ring-2 ring-white text-[10px] font-medium text-gray-600">
              +{extraCount}
            </div>
          )}
        </div>
        <span className="text-xs font-semibold text-gray-600">
          {membersCount} members
        </span>
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
            {getGroups?.map((group: any) => (
              <GroupCard
                key={group.id}
                name={group.group.name}
                id={""}
                avatarBgColor={""}
                role={group.role}
                title={group.group.description}
                updatedAt={group.group.createdAt}
                notesCount={0}
                filesCount={0}
                onClick={() => router.push(`group/note/${group.group.id}`)}
                membersCount={0}
                memberAvatars={[]}
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
