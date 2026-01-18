import React from "react";

type TagWrapperProps = {
  tags: string[];
};

const tagStyles: Record<string, string> = {
  programming: "bg-purple-100 text-purple-700 border-purple-200",
  mathematics: "bg-blue-100 text-blue-700 border-blue-200",
  science: "bg-green-100 text-green-700 border-green-200",
};

const tagIcons: Record<string, string> = {
  programming: "💻",
  mathematics: "📐",
  science: "🔬",
};

export const TagWrapper: React.FC<TagWrapperProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
            tagStyles[tag] || "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          <span className="text-base">{tagIcons[tag] || "🏷️"}</span>
          <span className="capitalize">{tag}</span>
        </span>
      ))}
    </div>
  );
};
