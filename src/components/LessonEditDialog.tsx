import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LessonForm } from "./LessonForm";
import { useUpdateLesson } from "../hooks/useLessons";
import type { Lesson, CreateLessonDto, UpdateLessonDto } from "../types/lesson";

interface LessonEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: Lesson | null;
  moduleId: string;
  courseId: string;
  onSuccess?: () => void;
}

export const LessonEditDialog = ({
  open,
  onOpenChange,
  lesson,
  moduleId,
  courseId,
  onSuccess,
}: LessonEditDialogProps) => {
  const updateMutation = useUpdateLesson();

  const handleUpdate = async (data: CreateLessonDto | UpdateLessonDto) => {
    if (!lesson) return;
    try {
      await updateMutation.mutateAsync({
        id: lesson._id,
        lesson: data as UpdateLessonDto,
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update lesson:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
         <DialogHeader>
           <DialogTitle>Edit Lesson</DialogTitle>
         </DialogHeader>
        {lesson && (
          <LessonForm
            moduleId={moduleId}
            courseId={courseId}
            lesson={lesson}
            onSubmit={handleUpdate}
            onCancel={() => onOpenChange(false)}
            isLoading={updateMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
