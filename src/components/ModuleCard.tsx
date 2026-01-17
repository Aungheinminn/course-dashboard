import type React from "react"
import { Button } from "./ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom";
import type { Module } from "../types/module";
import { formatDateShort } from "../lib/utils/dateFormatter";

interface ModuleCardProps {
    module: Module;
    courseId: string;
    onEdit: (module: Module) => void;
    onDelete: (module: Module) => void;
}

export const ModuleCard:React.FC<ModuleCardProps> = ({ module, courseId, onEdit, onDelete }) => {
  const navigate = useNavigate();
    return (
                <div
          key={module._id}
          className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
              <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{module.name}</h3>
                  {module.description && (
                    <p className="text-sm text-slate-600 mt-1">{module.description}</p>
                  )}
                  {module.createdAt && (
                    <p className="text-sm text-slate-500 mt-1">{formatDateShort(module.createdAt)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/courses/${courseId}/modules/${module._id}`)}
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(module)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(module)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
    )
}