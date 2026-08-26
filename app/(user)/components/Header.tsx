"use client";

import { getTimeOfDay } from "@/app/utils/timeOfDay";
import AiCreditsBadge from "./AiCreditsBadge";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";

export default function Header() {
  const profile = useSelector((state: RootState) => state.profile.profile);
  console.log(profile, "profile");
  const timeOfDay = getTimeOfDay();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Good {timeOfDay}, {profile?.userName} 👋
        </h2>
        <p className="text-gray-500 text-sm">Ready to ace your semester?</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          className="px-3 py-2 border rounded-lg w-64"
          placeholder="Search notes..."
        />
        <AiCreditsBadge />
        <span>🔔</span>
        <span>👤</span>
      </div>
    </div>
  );
}
