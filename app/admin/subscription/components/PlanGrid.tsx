// "use client";

// import React from "react";
// import { Check, X as CrossIcon } from "lucide-react";
// import { Plan } from "../types/subscription";

// interface Props {
//   plans: Plan[];
//   onSelectPlan: (plan: Plan) => void;
//   onCreatePlan: () => void;
// }

// export const PlanGrid: React.FC<Props> = ({
//   plans,
//   onSelectPlan,
//   onCreatePlan,
// }) => {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-bold text-gray-900">Choose Your Plan</h2>
//         <button
//           onClick={onCreatePlan}
//           className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
//         >
//           + Add New Custom Plan
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`relative bg-white rounded-xl p-6 border flex flex-col justify-between transition-all ${
//               plan.isCurrent
//                 ? "border-[#4F46E5] shadow-md ring-1 ring-[#4F46E5]"
//                 : "border-gray-100 shadow-sm hover:border-gray-200"
//             }`}
//           >
//             {plan.isCurrent && (
//               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
//                 CURRENT PLAN
//               </div>
//             )}

//             <div>
//               <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
//               <div className="mt-3 flex items-baseline gap-1">
//                 <span className="text-3xl font-extrabold text-gray-900">
//                   {plan.price}
//                 </span>
//                 <span className="text-xs text-gray-400 font-medium">
//                   /{plan.period}
//                 </span>
//               </div>

//               <ul className="mt-6 space-y-3 text-xs text-gray-600">
//                 {plan.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center gap-2">
//                     {feature.included ? (
//                       <Check className="w-4 h-4 text-indigo-500 shrink-0" />
//                     ) : (
//                       <CrossIcon className="w-4 h-4 text-gray-300 shrink-0" />
//                     )}
//                     <span
//                       className={
//                         feature.included
//                           ? "text-gray-700"
//                           : "text-gray-400 line-through"
//                       }
//                     >
//                       {feature.text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-8">
//               <button
//                 disabled={plan.isCurrent}
//                 onClick={() => onSelectPlan(plan)}
//                 className={`w-full py-2.5 rounded-lg text-xs font-semibold transition ${
//                   plan.isCurrent
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : plan.buttonVariant === "primary"
//                       ? "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-sm"
//                       : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {plan.buttonText}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
"use client";

import React, { useState } from "react";
import {
  Check,
  X as CrossIcon,
  Edit2,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Plan } from "../types/subscription";

interface Props {
  plans: Plan[];
  onSelectPlan: (plan: Plan) => void;
  onCreatePlan: () => void;
  onEditPlan: (plan: Plan) => void;
  onDeletePlan: (plan: Plan) => void;
}

export const PlanGrid: React.FC<Props> = ({
  plans,
  onSelectPlan,
  onCreatePlan,
  onEditPlan,
  onDeletePlan,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Manage Plans (Admin)
        </h2>
        <button
          onClick={onCreatePlan}
          className="text-xs font-semibold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
        >
          + Add New Custom Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl p-6 border flex flex-col justify-between transition-all ${
              plan.isCurrent
                ? "border-[#4F46E5] shadow-md ring-1 ring-[#4F46E5]"
                : "border-gray-100 shadow-sm hover:border-gray-200"
            }`}
          >
            {plan.isCurrent && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                CURRENT PLAN
              </div>
            )}

            <div>
              {/* Header with Title and Admin Menu */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>

                {/* Admin Quick Actions */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenuId(activeMenuId === plan.id ? null : plan.id)
                    }
                    className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Options */}
                  {activeMenuId === plan.id && (
                    <div className="absolute right-0 top-7 z-20 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 text-left">
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          onEditPlan(plan);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                        Edit Plan
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          onDeletePlan(plan);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  /{plan.period}
                </span>
              </div>

              {/* Feature List */}
              <ul className="mt-6 space-y-3 text-xs text-gray-600">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    ) : (
                      <CrossIcon className="w-4 h-4 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-gray-700"
                          : "text-gray-400 line-through"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin Action Button & Select Bar */}
            <div className="mt-8 space-y-2">
              <button
                disabled={plan.isCurrent}
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition ${
                  plan.isCurrent
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : plan.buttonVariant === "primary"
                      ? "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {plan.buttonText}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => onEditPlan(plan)}
                  className="flex-1 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1 transition"
                >
                  <Edit2 className="w-3 h-3 text-gray-500" />
                  Edit
                </button>
                <button
                  onClick={() => onDeletePlan(plan)}
                  className="flex-1 py-1.5 border border-rose-100 bg-rose-50/50 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-100 flex items-center justify-center gap-1 transition"
                >
                  <Trash2 className="w-3 h-3 text-rose-500" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
