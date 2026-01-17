import { Eye, Trash2, Download, FileText } from "lucide-react";
import type React from "react";
import { formatFileSize } from "../lib/utils/fileFormatter";
import { formatDateShort } from "../lib/utils/dateFormatter";

type PdfProps = {
  id: string;
  type: string;
  name: string;
  uploadedAt: Date;
  url: string;
  size?: number;
};

type PdfCardProps = {
  item: PdfProps;
  onDeleteClick?: (id: string) => void;
};

export const PdfCard: React.FC<PdfCardProps> = ({ item, onDeleteClick }) => {
  return (
    <div
      key={item.id}
      className="group w-full relative h-[350px] flex flex-col justify-center items-center rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 bg-gradient-to-br from-red-50 to-orange-50"
    >
      {/* PDF Icon Display */}
      <div className="flex flex-col items-center justify-center gap-3 z-10 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
        <div className="p-4 bg-red-100 rounded-2xl group-hover:scale-90 transition-transform duration-300">
          <FileText size={48} className="text-red-600" />
        </div>
        <div className="text-center max-w-[90%]">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {item.name}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formatFileSize(item.size)}
          </p>
        </div>
      </div>

      {/* Overlay Background */}
      <div className="absolute inset-0 transition-all duration-300 ease-in-out bg-gradient-to-t from-slate-900/70 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 top-0 rounded-2xl z-10 pointer-events-none" />

      {/* Top Info on Hover */}
      <div className="absolute top-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
        <p className="truncate">{item.name}</p>
        <p className="text-xs text-gray-200 mt-1">
          {formatFileSize(item.size)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-0 right-0 w-full flex items-center justify-center gap-3 z-30 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2.5 bg-white/20 hover:bg-red/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-110 text-white cursor-pointer">
          <Eye size={18} />
        </button>

        <button className="p-2.5 bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-110 text-blue-200 hover:text-blue-100 cursor-pointer">
          <Download size={18} />
        </button>

        <button
          onClick={() => onDeleteClick?.(item.id)}
          className="p-2.5 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-110 text-red-200 hover:text-red-100 cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Info Badge */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent p-4 text-white z-20 opacity-0 group-hover:opacity-0 transition-opacity duration-300">
        <p className="text-sm font-semibold truncate">{item.name}</p>
        <p className="text-xs text-gray-300 mt-1">
          {formatDateShort(item.uploadedAt)}
        </p>
      </div>
    </div>
  );
};
