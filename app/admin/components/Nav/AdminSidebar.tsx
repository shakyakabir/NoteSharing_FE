// "use client";

// import React from "react";
// import {
//   LayoutDashboard,
//   Users,
//   CreditCard,
//   Sparkles,
//   ShoppingBag,
//   DollarSign,
//   Megaphone,
//   BarChart3,
//   Settings,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// const navItems = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     link: "/admin/dashboard",
//   },
//   {
//     label: "Users",
//     icon: Users,
//     link: "/admin/user",
//   },
//   {
//     label: "Subscriptions",
//     icon: CreditCard,
//     link: "/admin/subscription",
//   },
//   {
//     label: "AI Credits",
//     icon: Sparkles,
//     link: "/admin/ai-credit",
//   },
//   {
//     label: "Point Shop",
//     icon: ShoppingBag,
//     link: "/admin/Points-rewards-management",
//   },
//   {
//     label: "Payments",
//     icon: DollarSign,
//     link: "/admin/payment",
//   },
//   {
//     label: "Ads",
//     icon: Megaphone,
//     link: "/admin/ads",
//   },
//   {
//     label: "Analytics",
//     icon: BarChart3,
//     link: "/admin/analytics",
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     link: "/admin/settings",
//   },
// ];

// export const Sidebar = () => {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 border-r border-slate-100 bg-white min-h-screen p-6 flex flex-col justify-between">
//       <div>
//         <div className="flex items-center space-x-2 px-3 py-3 mb-6">
//           <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
//             <Image src="/logo.png" alt="Logo" width={500} height={29} />
//           </div>
//           <span className="text-lg font-semibold tracking-tight text-slate-900">
//             NoteHive
//           </span>
//         </div>

//         <nav className="space-y-1">
//           {navItems.map((item) => {
//             const Icon = item.icon;

//             const isActive =
//               pathname === item.link || pathname.startsWith(`${item.link}/`);

//             return (
//               <Link
//                 key={item.label}
//                 href={item.link}
//                 className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
//                   isActive
//                     ? "bg-indigo-50 text-indigo-600 font-semibold"
//                     : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />

//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </aside>
//   );
// };
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/admin/dashboard" },
  { label: "Users", icon: Users, link: "/admin/user" },
  { label: "Subscriptions", icon: CreditCard, link: "/admin/subscription" },
  { label: "AI Credits", icon: Sparkles, link: "/admin/ai-credit" },
  {
    label: "Point Shop",
    icon: ShoppingBag,
    link: "/admin/Points-rewards-management",
  },
  { label: "Payments", icon: DollarSign, link: "/admin/payment" },
  { label: "Ads", icon: Megaphone, link: "/admin/ads" },
  { label: "Analytics", icon: BarChart3, link: "/admin/analytics" },
  { label: "Settings", icon: Settings, link: "/admin/settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200/80 bg-white px-4 py-6">
      {/* Brand Logo */}
      <div className="mb-8 px-2">
        <Image
          src="/logo.png"
          alt="AI Note Sharing"
          width={120}
          height={40}
          className="h-auto w-[120px]"
          priority
        />
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {navItems.map(({ label, icon: Icon, link }) => {
          const isActive = pathname === link || pathname.startsWith(`${link}/`);

          return (
            <Link
              key={label}
              href={link}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
