import React from "react";
import { Lightbulb } from "lucide-react";

export default function StudyTip(): React.JSX.Element {
  return (
    <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100/70 flex items-start gap-3">
      <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-500 shrink-0">
        <Lightbulb className="w-4 h-4 fill-amber-500/10" />
      </div>
      <div>
        <h5 className="text-xs font-bold text-amber-900">Study Tip</h5>
        <p className="text-xs text-amber-800/80 mt-0.5 leading-relaxed">
          Quizzes are most effective 24 hours after your initial note-taking to
          reinforce long-term retention.
        </p>
      </div>
    </div>
  );
}
