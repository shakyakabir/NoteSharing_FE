"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTimeOfDay } from "@/app/utils/timeOfDay";
import AiCreditsBadge from "./AiCreditsBadge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../lib/store";

export default function Header() {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const timeOfDay = getTimeOfDay();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    window.location.href = "http://localhost:8080/logout";
    router.push("/login");
  };

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

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="cursor-pointer select-none"
          >
            👤
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-md py-1 z-50">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
