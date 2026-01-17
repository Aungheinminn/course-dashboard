import type React from "react"
import { Button } from "./ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom";
import type { Lesson } from "../types/lesson";
import { formatDateShort } from "../lib/utils/dateFormatter";

interface LessonCardProps {
    lesson: Lesson;
    courseId: string;
    moduleId: string;
    onEdit: (lesson: Lesson) => void;
    onDelete: (lesson: Lesson) => void;
}

export const LessonCard:React.FC<LessonCardProps> = ({ lesson, courseId, moduleId, onEdit, onDelete }) => {
  const navigate = useNavigate();
    return (
                <div
          key={lesson._id}
          className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
              <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{lesson.name}</h3>
                  {lesson.createdAt && (
                    <p className="text-sm text-slate-500 mt-1">{formatDateShort(lesson.createdAt)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/lessons/${lesson._id}`)}
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(lesson)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(lesson)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
    )
}