import { FileText } from "lucide-react";
import type { Lesson } from "../types/lesson";
import { LessonCard } from "./LessonCard";

interface LessonListProps {
  courseId: string;
  moduleId: string;
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
}

export const LessonList = ({
  courseId,
  moduleId,
  lessons,
  onEdit,
  onDelete,
}: LessonListProps) => {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">
          No lessons yet. Create your first lesson to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson._id}
          lesson={lesson}
          courseId={courseId}
          moduleId={moduleId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
