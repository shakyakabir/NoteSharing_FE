import React from "react";
import {
  Search,
  Bell,
  History,
  ArrowRight,
  FileUp,
  PlayCircle,
  UserPlus,
} from "lucide-react";

import StatCard from "../components/Card/StatCard";
import ActivityItem from "../components/Card/ActivityItem";
import TrendingCard from "../components/Card/TrendingCard";
import PromoBanner from "../components/Card/BannerCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Dynamic Page Content */}
      <main className="p-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left & Middle Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Good morning, Alex! <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Ready to ace your semester? Here's what's happening today.
            </p>
          </div>

          {/* Quick Stats Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Notes Posted"
              value="128"
              icon="📄"
              iconBg="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              title="Total Points"
              value="2,450"
              icon="⭐"
              iconBg="bg-amber-50 text-amber-500"
            />
            <StatCard
              title="Learning Streak"
              value="14 Days"
              icon="🔥"
              iconBg="bg-orange-50 text-orange-500"
            />
          </div>

          {/* Main Action Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="bg-indigo-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-sm">
              <FileUp size={16} /> <span>Post Note</span>
            </button>
            <button className="bg-amber-700 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2 shadow-sm">
              <PlayCircle size={16} /> <span>Start Quiz</span>
            </button>
            <button className="bg-gray-100 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <UserPlus size={16} /> <span>Invite Friend</span>
            </button>
          </div>

          {/* Activity Timelines Card Container */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Recent Activity
              </h3>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              <ActivityItem
                type="edit"
                text={
                  <>
                    You edited{" "}
                    <span className="font-semibold text-gray-900">
                      "Introduction to Macroeconomics"
                    </span>
                  </>
                }
                time="2 hours ago"
              />
              <ActivityItem
                type="comment"
                text={
                  <>
                    Sarah Chen commented on your{" "}
                    <span className="font-semibold text-gray-900">
                      "Organic Chemistry 101"
                    </span>
                  </>
                }
                time="4 hours ago"
              />
              <ActivityItem
                type="badge"
                text={
                  <>
                    You earned{" "}
                    <span className="font-semibold text-gray-900">
                      "Top Contributor"
                    </span>{" "}
                    badge in Biology
                  </>
                }
                time="Yesterday"
              />
            </div>
          </div>

          {/* Bottom Large Ad Banner */}
          <PromoBanner />
        </div>

        {/* Right Sidebar - Trends and Feeds */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm self-start space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">Trending Notes</h3>
          </div>

          <div className="space-y-5">
            <TrendingCard
              image="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=400&q=80"
              tag="Science"
              title="Advanced Cellular Dynamics"
              views="1.2k"
              likes="482"
            />
            <TrendingCard
              image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80"
              tag="Psychology"
              title="Cognitive Bias Masterclass"
              views="945"
              likes="150"
            />
          </div>

          <button className="w-full text-center border border-gray-100 rounded-xl py-2.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50/50 transition-colors mt-2">
            Explore all trending
          </button>
        </div>
      </main>
    </div>
  );
}
