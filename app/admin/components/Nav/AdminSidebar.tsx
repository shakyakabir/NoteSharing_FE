import React from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Sparkles,
  ShoppingBag,
  DollarSign,
  Megaphone,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
    link: "admin/dashboard",
  },
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
    <aside className="w-64 border-r border-slate-100 bg-white min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold text-indigo-900 tracking-tight">
            NoteAura Admin
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Institutional Suite
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <Link
                  href={item.link}
                  key={item.link}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
