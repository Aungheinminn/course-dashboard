import { Eye, Trash2 } from "lucide-react";
import type React from "react";
import { formatFileSize } from "../lib/utils/fileFormatter";

type ImageProps = {
  id: string;
  type: string;
  name: string;
  uploadedAt: Date;
  url: string;
  size?: number;
};

type ImageCardProps = {
  item: ImageProps;
  onDeleteClick?: (id: string) => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({ item, onDeleteClick }) => {
  return (
    <div
      key={item.id}
      className="group w-full relative h-[350px] flex flex-col justify-center items-center rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100"
    >
      {/* Image */}
      <img
        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 pointer-events-none"
        src={item.url}
        alt={item.name}
      />

      {/* Overlay Background */}
      <div className="absolute inset-0 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 top-0 rounded-2xl z-10 pointer-events-none" />

      {/* Top Info on Hover */}
      <div className="absolute top-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
        <p className="truncate">{item.name}</p>
        <p className="text-xs text-gray-200 mt-1">
          {formatFileSize(item.size)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-0 right-0 w-full flex items-center justify-center gap-3 z-30 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2.5 bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-110 text-white cursor-pointer">
          <Eye size={18} />
        </button>

        <button
          onClick={() => onDeleteClick?.(item.id)}
          className="p-2.5 bg-red-500/40 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-110 text-red-200 cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
